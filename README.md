# NUMBER FUN LAND — Premium Visual Edition

## Chạy phần mềm
Giải nén toàn bộ ZIP, nhấp đúp `index.html` và mở bằng Chrome hoặc Edge. Không cần server hay cài đặt. Kết nối Internet nếu trình duyệt cần tải giọng TTS.

## Trò chơi
- **Balloon Pop:** Chọn số, nghe giọng đọc tiếng Anh, bấm bóng đúng để nổ, sai thì thử lại.
- **Crocodile Dentist:** Nhổ răng có số được đọc, cá sấu vui khi đúng, ngậm miệng hài hước khi sai.
- Chọn số 0–10, nhiều mức khó, Practice / Challenge / Endless, số bóng 2–11, nghe lại, tạm dừng, kết quả.
- Bảng chọn giọng đọc, chỉnh âm lượng Voice/Music/Effects, bật/tắt nhạc và gợi ý.

## Âm thanh
Số được đọc bằng `speechSynthesis` của trình duyệt (phụ thuộc giọng cài trên máy hoặc dịch vụ hệ điều hành). Nhạc và hiệu ứng tổng hợp bằng Web Audio API, không cần tải file âm thanh từ website. Nhấn START hoặc TEST VOICE để kích hoạt âm thanh.

## Giới hạn đã biết
- Giọng TTS có thể khác nhau giữa các thiết bị; không thể cam kết có giọng tiếng Anh trên mọi máy.
- Lưu cài đặt trong LocalStorage có thể bị giới hạn khi dùng file:// tùy trình duyệt.
- Đồ họa là SVG/CSS tự tạo, chưa có bộ nhân vật sprite/illustration chuyên nghiệp từ họa sĩ.
- Không có chức năng đội A/B, ghi âm hay nhạc thương mại có bản quyền.

## Cấu trúc
`index.html`, `css/style.css`, `css/animations.css`, `css/premium.css`, `js/app.js`, `js/audio.js`, `js/balloon.js`, `js/crocodile.js`.


## V5 (14/10/2026)
- Balloon POP uses a bundled pressure-burst WAV sample instead of a two-note synth beep; the sound is synthesized to resemble a real balloon burst, **not an authentic field recording**.
- Crocodile uses a cartoon hand with one extended pointing finger; hand reaches the selected tooth.
- Incorrect answers show small stylized red bite marks/droplets after jaw snap; no graphic injury.
- Existing tooth positions remain unchanged until all selected teeth are removed.


## V6 — arrow and finger-first animation
- Correct balloon: a fast SVG arrow launches toward the clicked balloon, with whoosh SFX. The balloon pops only when the arrow reaches it.
- Crocodile: the hand moves to the selected tooth, makes contact, then the game resolves correct/incorrect. Existing teeth keep their fixed positions.
- Audio effects generated via Web Audio; number pronunciation uses browser TTS.


## V7 — Seasonal visual themes
The **Theme** selector offers Spring, Halloween, Birthday, and Christmas. It updates home, setup, game scenery, and results via CSS variables. **Game mode** remains a separate selector (Practice/Challenge/Endless). The selected theme is saved with existing settings when localStorage is available. Theme changes never restart a game or reshuffle crocodile teeth. Open `index.html` directly.


## V8 — Completion Popup & Infinite Replay
- A congratulatory popup appears when all selected balloons have popped or all crocodile teeth have been removed.
- **Play Again — Shuffle** rebuilds the entire game with the selected numbers, freshly shuffled balloon slots and tooth order.
- **Play Forever** starts a new round in Endless mode; each completed round shows the popup again so the teacher can repeat indefinitely.
- **Change Numbers** and **Home** are available in the popup.
- Correctly removed balloons/teeth are never recreated during an active round.


## V9 — Infinite play in setup
- In **Game Setup**, enable **♾ Infinite play** before START GAME.
- When the last balloon is popped or the last tooth is removed, the game immediately starts a new shuffled round with all selected numbers restored. **No completion popup appears** in this mode.
- Balloon positions and crocodile tooth order are shuffled for the new round, while remaining objects never reset during a round.
- Scores and mistake totals accumulate across rounds. The HUD displays the round number.
- Disable Infinite play for the standard congratulatory popup after one round.
- This setting is independent of Practice/Challenge and is saved when browser storage is available.


## V10 — Crocodile redesign
- Wide horizontal side-view crocodile with long snout, raised eye ridge, nostril, scales, tail, legs, large mouth and warm belly.
- Numbered teeth enlarged and spaced across a wide jaw for touch/projector play.
- Tooth positions remain fixed during a round; removed teeth disappear without reordering.
- Finger interaction, bite, themes, balloon play and infinite rounds retained.
- Requires visual verification in Chrome/Edge for each screen size.


## V11 — Crocodile jaw and teeth upgrade
- Upper jaw rotates around a rear skull hinge; lower jaw counter-rotates subtly. No translateX/translateY snapping.
- Numbered teeth occupy non-overlapping fixed sockets, with upper teeth attached to the moving upper jaw.
- Remaining teeth retain their positions until the entire round is complete.
- Finger reaches a tooth before answer feedback; bite follows a wrong touch.
- Test on Chrome/Edge and classroom display sizes; browser animation rendering may vary.


## V12 — Gợi ý sau hai lần sai
- Mặc định bật trong Setup; có thể tắt bằng checkbox.
- Sau hai lần chọn sai **trong cùng một câu hỏi**, bóng hoặc răng đúng rung và phát sáng liên tục cho đến khi chọn đúng.
- Không đổi đáp án, không xáo trộn răng hoặc bóng; khi sang câu mới, gợi ý được xóa và đếm sai được đặt về 0.
- Chế độ giảm chuyển động giữ viền sáng nhưng không rung.


## V13 — Front-facing crocodile redesign
- New premium front-facing illustrated SVG crocodile inspired by supplied reference (original vector illustration, not a copy of the image).
- Wide deep mouth, green snout, paired eyes and nostrils, rounded cheeks, large individually spaced numbered teeth.
- Preserves existing finger press, bite response, hints, removal and infinite play.
- SVG jaw animation is stylized, not photorealistic.


## V14 — Prompt dock outside gameplay
The LISTEN & FIND THE NUMBER panel is now placed between the score/controls toolbar and the playfield, never floating over the balloons or crocodile teeth. The prompt remains visible in all themes and on smaller screens.


## V15 – Crocodile bite alignment
- Finger tip moves to the exact screen position of the clicked tooth, then presses before any feedback.
- Wrong answer: full closed-mouth overlay, short hold, then mouth opens and finger retreats.
- Correct answer: only the selected tooth is removed.
- Existing modes, themes, hints and endless play preserved.


## V16 — Bite synchronization & screen-fit controls
- Finger travels to clicked tooth (480 ms), presses (145 ms), then and only then the answer is evaluated.
- Incorrect: jaw closes once (300 ms); bite sound + cartoon bite marks at impact; holds 220 ms; opens 500 ms as hand retreats. No second bite sound.
- Correct: finger presses first, tooth is removed, no bite.
- Compact responsive toolbar and game viewport to fit desktop screens; mobile breakpoints included.
- Browser visual/audio testing is still required.


V17: Five-finger hand with extended index finger. Contact at 600ms, press through 730ms, wrong bite closes once by 990ms, holds 190ms, reopens and withdraws by 1630ms. The other game mechanics remain unchanged.


## V18 — Archery and index finger
- Balloon Pop: visible bow at the bottom center of the playfield, animated arrow flies from bow to the clicked correct balloon. Bow sound precedes arrow whoosh; pop triggers at impact.
- Crocodile Dentist: five-finger hand redrawn with clearly extended leftmost index finger. Index fingertip aligned to selected tooth; feedback starts after the press.
- Open `index.html` directly in Chrome or Edge.


## V19 — Bow & index finger
- Larger curved bow with rotating bow assembly that aims toward the chosen balloon.
- Arrow is aligned with its velocity vector, with draw → release → flight → impact → pop sequence.
- Anatomically ordered five-finger cartoon hand: thumb at left, index extended, middle/ring/pinky curled; fingertip anchor at x=64 of 190.
- Existing games, themes, infinite play, and hints retained.


## V20
- Removed the separate HUD Hear Again button. Click the prominent LISTEN CAREFULLY prompt to replay the spoken target; keyboard accessible.
- Bow starts without a nocked arrow. Clicking a correct balloon briefly loads the arrow, then releases it and animates its flight.
- Reworked crocodile hand with lighter skin and an explicitly extended index finger; adjusted finger-tip alignment.


## V21
- Listen Carefully is the clickable replay button; calls audio.unlock and audio.say.
- Enlarged gameplay to use available desktop viewport height.
- Grouped setup into numbered sections with adaptive responsive layout.
- Removed Difficulty and Game mode controls; defaults are easy/practice internally.


## V22 polish
- Curved balloon strings with a shaded balloon knot.
- Crocodile teeth attach along the upper and lower gum curves.
- Brief, stylized blood trickle and droplets after one wrong bite; child-friendly non-graphic effect.
- Retains V21 controls, speech replay, archery, and infinite play.


## V25 - Jaw-aligned teeth
Upper and lower teeth use equal-sized shapes, with their roots placed directly along the green lip outlines in the crocodile SVG. Tooth groups rotate with the local lip tangent; number labels counter-rotate to stay upright. Built from the user-uploaded V22 archive.

V27: Hint tooth stays anchored to its jaw. Only inner visual wiggles/glows; tooth disappears only after correct click.

V28: Tooth position/angle moved to separate non-animated SVG anchor. Hint uses light-only pulse; no displacement.
