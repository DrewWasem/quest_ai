# Heuristics — 3D Game Development

## Scene Composition

- **When setting up a new scene:** Start with HemisphereLight(sky, ground, 0.6) + one DirectionalLight(white, 1.0) with shadows. This covers 90% of lighting needs. Add point lights only for specific effects (torches, glowing objects).
- **When models look flat:** Add an Environment preset from Drei (night, apartment, sunset, park). The IBL reflections add subtle realism to low-poly models without extra lights.
- **When the scene feels empty:** Add ContactShadows, fog (near=10, far=50), and Sparkles or Stars from Drei. These are cheap GPU-wise but dramatically improve atmosphere.
- **When objects float above the ground:** Add ContactShadows with opacity 0.4, blur 2.5, far 4. This grounds objects visually without expensive shadow maps.

## Model Loading

- **When a model appears but has no texture:** Check if the GLTF uses embedded textures or external files. KayKit models use a single gradient atlas — make sure the atlas PNG is in the same directory as the GLTF.
- **When a skinned mesh doesn't animate:** Verify you used SkeletonUtils.clone(), not object.clone(). Then check that clip names match exactly — log `gltf.animations.map(a => a.name)` to see available clips.
- **When a model appears at wrong scale:** KayKit models are ~1 unit tall. Set scale based on the model's bounding box, not arbitrary values. Use `new THREE.Box3().setFromObject(model)` to measure.
- **When models appear at origin instead of spawn position:** Set position on the group/ref AFTER the model is loaded, in a useEffect that depends on the scene/gltf state.

## Animation

- **When crossfade looks jerky:** Increase crossFadeTo duration to 0.25-0.4 seconds. For idle→action, 0.25s. For action→idle, 0.4s (slower return feels more natural).
- **When an animation plays once and stops:** Check if loop mode is set. `action.setLoop(THREE.LoopRepeat)` for continuous, `THREE.LoopOnce` + `action.clampWhenFinished = true` for play-once.
- **When you need a character to perform an action then return to idle:** Use the 'finished' event: `mixer.addEventListener('finished', () => fadeToIdle())`. Set the action clip to LoopOnce.
- **When multiple characters share animations:** Load animation GLB once, extract clips, apply to each character's mixer. The clips are rig-agnostic if the bone names match (KayKit uses "Rig_Medium" across all characters).

## Performance

- **When framerate drops below 50fps:** Check draw calls first (`renderer.info.render.calls`). If >50, look for models with multiple materials — combine into atlas. If draw calls are fine, check triangle count (`renderer.info.render.triangles`).
- **When a scene loads slowly:** Preload with `useGLTF.preload([urls])` in a loading screen component. Show progress with Suspense + a loading UI. Never block the main thread.
- **When textures look blurry:** Check texture.minFilter — set to THREE.LinearFilter for low-poly styles. NearestFilter gives pixel-art look. Also check that texture dimensions are power-of-2 (512, 1024, 2048).
- **When React re-renders kill performance:** Move per-frame logic into useFrame with refs. Only use React state for things that change the component tree (showing/hiding elements, changing which model is loaded). Position, rotation, scale → refs.

## Post-Processing

- **When adding bloom:** Start with intensity 0.3, luminanceThreshold 0.9. Low-poly games look best with subtle bloom — heavy bloom makes everything look washed out.
- **When bloom affects everything:** Use luminanceThreshold to limit it to bright elements. Or use selective bloom with layers.
- **When Vignette is too heavy:** offset 0.3, darkness 0.6 is a good starting point. Vignette should be felt, not seen.
- **When post-processing drops framerate:** First thing to cut: SSAO. It's the most expensive effect. Bloom and Vignette are relatively cheap.

## React Three Fiber Specifics

- **When you need orbit controls for debugging:** Add `<OrbitControls />` from Drei temporarily. Remove for production or lock with enableRotate={false} for kids (prevent disorienting camera).
- **When shadows don't appear:** Check: (1) renderer shadow map enabled, (2) light.castShadow = true, (3) mesh.castShadow = true, (4) ground mesh.receiveShadow = true, (5) shadow camera frustum covers the scene.
- **When a Drei component doesn't work:** Check version compatibility. @react-three/fiber v8 requires @react-three/drei v9. Postprocessing v2.x. Mismatched versions cause cryptic errors.
