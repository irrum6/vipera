dir="locales"
cat $dir/en.js $dir/ka.js $dir/de.js $dir/translate.js > app.locale.js

dir="lib"
cat $dir/enumer.js $dir/utils.js  > app.lib.js

dir="components"
cat $dir/gwindow.js $dir/small_display.js $dir/pop.js $dir/new_game_dialog.js $dir/dialog.js $dir/radiobox.js $dir/colorbox.js > app.templates.js

dir="entities"
cat $dir/vipera.js $dir/food.js > app.entities.js

dir="controls"
cat  $dir/keyboard.js  $dir/inputController.js  $dir/uicontroller.js > app.controls.js

dir="game"
cat $dir/player.js $dir/game_options.js $dir/gamesettings.js $dir/perfmon.js $dir/mvgame.js  $dir/translate.js > app.game.js

rm app.preload.js
cat app.locale.js  app.lib.js app.templates.js app.entities.js app.controls.js  app.game.js  > app.preload.js
printf "//Build Date : $(date -I'minutes')" >> app.preload.js

rm app.lib.js app.templates.js app.entities.js app.controls.js  app.game.js
echo `date -I'minutes'`