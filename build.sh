rm app.lib.js
dir="lib"
cat $dir/enumer.js $dir/utils.js  > app.lib.js

rm app.templates.js
dir="components"
cat $dir/gwindow.js $dir/small_display.js $dir/pop.js $dir/new_game_dialog.js $dir/dialog.js $dir/radiobox.js $dir/colorbox.js > app.templates.js

rm app.entities.js
dir="entities"
cat $dir/vipera.js $dir/food.js > app.entities.js

rm app.controls.js
dir="controls"
cat  $dir/keyboard.js  $dir/inputController.js  $dir/uicontroller.js > app.controls.js

rm app.game.js
dir="game"
cat $dir/player.js $dir/game_options.js $dir/gamesettings.js $dir/perfmon.js $dir/mvgame.js  $dir/translate.js > app.game.js

rm app.preload.js
cat app.lib.js app.templates.js app.entities.js app.controls.js  app.game.js > app.preload.js
printf "//Build Date : $(date -I'minutes')" >> app.preload.js

echo `date -I'minutes'`