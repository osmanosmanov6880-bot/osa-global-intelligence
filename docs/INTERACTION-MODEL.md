# Interactive model

Each scene has an authored insight. Three scenes include a choice prompt and three options. Choosing an option immediately renders its consequence and lesson; the choice is saved locally and restored when the page is reopened.

The decision is educational, not a psychological profile. The product does not score the learner's personality or use choices for advertising.

Progress is counted when the learner navigates away from a scene. It is stored in localStorage under `osa-cinema-progress-v1`. The reset button clears it. Browser storage can be disabled or cleared by the user; no server-side persistence is claimed.

The "text of scene" control reveals the narration text. It is not a video play/pause control and does not imply that audio exists.
