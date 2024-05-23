const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../helpers/auth');
const { checkFiles, handleFileUpload } = require('../helpers/filehandlers');
const { renderPage } = require('../helpers/renders');
const {
  mockGetAllCacheFiles,
  mockReadContentCache,
  mockCountSpeakers,
  mockDeleteCachedFile,
  mockChangeSpeakerLabel
} = require('../helpers/transcribe');



router.get('/', renderPage('index'));
router.get('/terms', renderPage('terms'));
router.get('/elements', renderPage('elements'));
router.get('/logout', (req, res) => req.logout((err) => err ? err : res.redirect('/')));
router.get('/loginFailed', (req, res) => res.render('index', { title: 'Transcribe', loginError: true, anchor: 'one' }));
router.get('/start', isLoggedIn, renderPage('start'));
router.get('/uploadVideo', isLoggedIn, renderPage('uploadVideo'));
router.get('/uploadAudio', isLoggedIn, renderPage('uploadAudio'));
router.get('/existing', isLoggedIn, async (req, res) => {
  const fileNames = mockGetAllCacheFiles();
  res.render('existing', { title: 'Transcribe', files: fileNames });
});
router.get('/getFile', isLoggedIn, async (req, res) => {
  const fileName = req.query.fileName;
  const content = await mockReadContentCache(fileName);
  const returnedSpeakers = mockCountSpeakers(content);
  const transcriptResult = JSON.stringify(content);
  res.render('result', { title: 'Sample Transcript', content, speakerList: returnedSpeakers, transcriptResult });
});
router.get('/deleteFile', isLoggedIn, async (req, res) => {
  const fileName = req.query.fileName;
  await mockDeleteCachedFile(fileName);
  res.redirect('/existing');
});
router.get('/debug', isLoggedIn, async (req, res) => {
  const content = await mockReadContentCache();
  const returnedSpeakers = mockCountSpeakers(content);
  const transcriptResult = JSON.stringify(content);
  res.render('result', { title: 'Sample Transcript', content, speakerList: returnedSpeakers, transcriptResult });
});
router.post('/setSpeakerTitles', isLoggedIn, async (req, res) => {
  const oldContent = JSON.parse(req.body.transcriptResult);
  const content = await mockChangeSpeakerLabel(req.body, oldContent);
  const returnedSpeakers = mockCountSpeakers(content);
  const transcriptResult = JSON.stringify(content);
  res.render('result', {
    title: 'Transcribe',
    content,
    speakerList: returnedSpeakers,
    transcriptResult,
    speakersSet: true
  });
});
router.post('/uploadVideo', isLoggedIn, checkFiles, handleFileUpload(true));
router.post('/uploadAudio', isLoggedIn, checkFiles, handleFileUpload(false));
router.get('/administration', isLoggedIn, (req, res) => {
  if (res.locals.isAdmin) {
    res.render('administration', { title: 'Transcribe', heading: 'Administration' });
  } else {
    res.render('serverResults', {
      title: 'Transcribe',
      heading: 'Administration',
      cacheMessage: 'You need administrator access for this operation.'
    });
  }
});

// App Holder for Now
const app = express();
const port = 3000;
app.use('/', router);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


module.exports = router;
