# Project State Notes (internal)

## Status (CURRENT — name "Md Jonayed Ahamed" no II; collage object-contain full image) — all verified in live browser; checkpoint pending
- Collage panel in About.tsx now `w-full h-auto object-contain` on dark backing (full 3-photo collage visible, no crop).
- "II" removed from Hero.tsx LetterStagger, Footer wordmark+copyright, index.html title. TS check clean.

## Status (UPDATED — hero 3D FIXED)
- All sections built: Hero (3D bridge NOW RENDERING), Interstitials (MeasureStrip x2), About (morph wireframe), Experience, Projects (horizontal scroll gallery + HUD cards), Skills (3D tag cloud + services grid), Awards (marquee), Contact (magnetic form → mailto), Footer, Nav, Lenis.
- TS check passes. Style review applied once (Style Decisions in ideas.md); hero shows dominant 3D structure + HUD annotations + left-edge ruler; asymmetric drafting composition applied.

## Hero 3D fix history (for future reference)
1. Invisible hero canvas root cause: `lazy(() => Promise.resolve({default: StructureScene}))` + `<Suspense fallback={null}>` in Hero.tsx — synthetic thenable kept subtree suspended in dev with NO console errors. FIXED by rendering StructureScene directly.
2. Canvas 300x150 default buffer: fixed via `client/src/hooks/useElementSize.ts` (ResizeObserver + rAF fallback), MeasuredCanvas wrappers with `{width>0 && height>0 && <Canvas key={`${w}x${h}`} onCreated gl.setSize(w,h,false)>}`, and index.css `.scene-canvas { position:relative; width/height 100%; flex-shrink:0 }` + `.scene-canvas canvas { width/height 100% !important }`.
3. Camera/tuning (final): camera [1.2, 1.0, 10.2] fov 44; bridge group position [1.6,-0.5,-1.0] scale 0.78. Bridge spans right half of hero nicely (verified in live browser).

## Asset URLs (use exactly as-is)
- logo: /manus-storage/brand-logo_b1645213.png
- hero-structure: /manus-storage/hero-structure_34b0d810.jpg
- city: /manus-storage/section-city_0044f7ec.jpg
- concrete: /manus-storage/section-concrete_2fe545b7.jpg
- river: /manus-storage/section-river_e74020ee.jpg

## Key files
- client/src/components/three/StructureScene.tsx (bridge model, MeasuredCanvas)
- client/src/components/sections/*.tsx (Hero, About, Experience, Projects, Skills, Awards, Contact)
- client/src/components/Interstitial.tsx, Nav.tsx, Footer.tsx, MagneticButton.tsx, Reveal.tsx, SmoothScroll.tsx
- client/src/hooks/useElementSize.ts
- client/src/lib/data.ts, client/src/pages/Home.tsx, client/src/App.tsx, client/src/index.css

## VERIFIED (live browser)
- Hero 3D bridge renders beautifully on right half; About morph wireframe renders; Projects HUD gallery with depth-parallax cards confirmed (PRJ-01/02/03); Contact magnetic form renders; Footer OK; mobile hero + full-page OK.

## FOLLOW-UP (post-delivery)
- User uploaded pro photo collage → uploaded to /manus-storage/profile-collage_313a139e.png (local: /home/ubuntu/webdev-static-assets/profile-collage.png)
- Integrated in About.tsx right column: portrait panel (w-5/12, absolute inset img object-cover) + morph canvas (w-7/12) in flex row; fixed earlier collapsed grid layout
- Site IS PUBLISHED: jonayed3d-j2fqzqgw.manus.space (auto-publish). Must re-checkpoint after collage fix to push.
- Verification caveat: screenshot tool caches old HMR state; always confirm via live browser nav + console img query. Restart server only if curl shows source not updated.

## Remaining
- ~~Full-page visual pass (desktop + mobile) of all sections~~ done
- Write SETUP.md (local run: pnpm dev/build; Vercel/Netlify deploy steps) — user asked explicitly
- Save ONE checkpoint then deliver (attach manus-webdev://versionId). Tell user to click Publish in UI.
- Dev URL: https://3000-i1nvui5lksxvg6v598vk6-1661589d.us2.manus.computer
- Static assets dir: /home/ubuntu/webdev-static-assets/; upload via `manus-upload-file --webdev`
