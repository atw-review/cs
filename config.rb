require 'compass/import-once/activate'
Encoding.default_external = 'utf-8'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path      = "public/"
css_dir        = "public/assets/css"
images_dir     = "public/assets/img"
javascript_dir = "public/assets/js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# expanded = 一般，每行CSS皆會斷行
# nested = 有縮進，較好閱讀
# compact = 簡潔格式，匯出來的CSS檔案比上面兩個還小
# compressed = 壓縮過的CSS，所有設定都以一行來進行排列
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# 可在 sass 使用 image-url("*****.jpg")
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# 最後發佈前，要隱藏註解時，再開以下這條 uncomment
line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
# 上面這行的意思是，要將副檔名從 scss 改成 sass 時，請選對資料夾，但不要 watch，把這行貼到 $ 後面即可
# 參考這裡：http://sass-lang.com/documentation/file.SASS_REFERENCE.html
