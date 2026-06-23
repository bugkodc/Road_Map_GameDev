// Build-time prefetch of the curated Unity documentation pages used by the roadmap.
// Saves the raw upstream HTML into public/unity-docs/{script,manual}/<docPath>.json so the
// site works on a fully static host (GitHub Pages) with no runtime proxy.
//
// The client (src/utils/unityDocs.js -> parseUnityDocHtml) still does the DOM cleaning and
// sanitising, so we deliberately store the raw page HTML here — identical to what the old
// Vite proxy returned.
//
// Run: npm run update:unity   (or npm run update:docs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { UNITY_DOC_VERSION } from '../src/config/docVersions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGIN = 'https://docs.unity3d.com';

// Curated entry pages reached from the roadmap navigation.
// ScriptReference pages (must match the .html targets in src/utils/unityDocs.js -> TOPIC_DOCS).
const SCRIPT_DOCS = [
  'index.html',
  'GameObject.html',
  'MonoBehaviour.html',
  'Input.html',
  'Physics.html',
  'SceneManagement.SceneManager.html',
  'Events.UnityEvent.html',
  'AudioSource.html',
  'AI.NavMeshAgent.html',
  'Animation.html',
  'Renderer.html',
  'UIElements.VisualElement.html',
  'Device.Application.html',
  'Editor.html',
  'SceneManagement.EditorSceneManager.html',
  'AssetDatabase.html',
  'Unity.Mathematics.math.html',
  'Unity.Collections.NativeArray_1.html',
  'Profiling.Profiler.html',
  'Unity.VisualScripting.GraphReference.html',
  'AssemblyDefinitionAsset.html'
];

// Manual pages (must match the manualMapping in src/components/ContentReader.jsx).
const MANUAL_DOCS = [
  'index.html',
  'get-started.html',
  'unity-editor.html',
  'Packages.html',
  'AssetWorkflow.html',
  'Unity2D.html',
  'com.unity.ai.navigation.html',
  'XR.html',
  'multiplayer.html',
  'PlatformSpecific.html',
  'GameObjects.html',
  'CreatingScenes.html',
  'CamerasOverview.html',
  'CreatingEnvironments.html',
  'PhysicsSection.html'
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchDoc = async (docPath, isManual) => {
  const folder = isManual ? 'Manual' : 'ScriptReference';
  const sourceUrl = `${ORIGIN}/${UNITY_DOC_VERSION}/Documentation/${folder}/${docPath}`;
  const res = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'Road-Map-GameDev UnityDocsAdapter/1.0' }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const html = await res.text();
  return {
    html,
    sourceUrl,
    version: UNITY_DOC_VERSION,
    fetchedAt: new Date().toISOString()
  };
};

const run = async () => {
  console.log(`Prefetching Unity ${UNITY_DOC_VERSION} docs...`);
  const baseDir = path.resolve(__dirname, '../public/unity-docs');
  const scriptDir = path.join(baseDir, 'script');
  const manualDir = path.join(baseDir, 'manual');
  fs.mkdirSync(scriptDir, { recursive: true });
  fs.mkdirSync(manualDir, { recursive: true });

  const groups = [
    { docs: SCRIPT_DOCS, dir: scriptDir, isManual: false, label: 'ScriptReference' },
    { docs: MANUAL_DOCS, dir: manualDir, isManual: true, label: 'Manual' }
  ];

  let ok = 0;
  const failed = [];

  for (const group of groups) {
    for (const docPath of group.docs) {
      try {
        const payload = await fetchDoc(docPath, group.isManual);
        fs.writeFileSync(
          path.join(group.dir, `${docPath}.json`),
          JSON.stringify(payload),
          'utf8'
        );
        ok += 1;
        console.log(`  [ok] ${group.label}/${docPath}`);
      } catch (error) {
        failed.push(`${group.label}/${docPath} (${error.message})`);
        console.error(`  [FAIL] ${group.label}/${docPath}: ${error.message}`);
      }
      await sleep(300); // be polite to the upstream server
    }
  }

  console.log(`\nUnity docs done: ${ok} saved, ${failed.length} failed.`);
  if (failed.length) {
    console.log('Failed pages (likely renamed in this Unity version — update the lists):');
    failed.forEach((f) => console.log(`  - ${f}`));
  }
};

run();
