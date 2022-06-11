// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // Home
  HELP: "ヘルプ",
  IMAGE_SELECT: "画像を選択してください",
  IMAGE_SELECT_BUTTON: "画像を選択",
  WIDTH_BLOCK: "横幅のブロック数",
  CONVERT_BUTTON: "変換する",
  IMAGE_DOWNLOAD: "画像ダウンロード",
  CSV_DOWNLOAD: "CSVダウンロード",
  COMMAND_GENERATION: "コマンド生成",
  EDIT: "編集する",
  REPLACE: "置き換え",
  PREVIEW: "プレビュー",
  BACK_TO_HOME: "ホームに戻る",
  JAVA_EDITION: "Java版",
  BEDROCK_EDITION: "統合版",

  // HELP
  USAGE: "使い方",
  USAGE1: "写真を選択",
  USAGE2: "ドット絵の横幅のブロック数を入力",
  USAGE3: "ドット絵に使いたいブロックを選択",
  USAGE4: "変換ボタンをクリック",
  USAGE5: "ドット絵の画像、csvファイル、生成コマンドをダウンロードできます",
  USAGE6: "自動変換したドット絵を専用の画像編集ツールで細かく修正できます",

  // COMMAND
  HOW_TO_RUN_COMMAND: "コマンドの実行方法",
  COMMAND1: "functionという機能を使ってコマンドを一括で実行します．",
  COMMAND2:
    "マインクラフトのエディション，実行機種によってやり方が異なります．現状，switch,Xboxでは実行できません．",
  COMMAND_JAVA_LINK: "Java版",
  COMMAND_BEDROCK_IPHONE_LINK: "統合版 (iphone)",
  COMMAND_BEDROCK_PC_LINK: "統合版 (PC, android)",

  // java COMAMND
  JAVA_COMMAND_TITLE: "java版のfunction実行方法",
  JAVA_COMMAND_SECTION1: "コマンドをダウンロードする",
  JAVA_COMMAND_SECTION2: "zipファイルを解凍",
  JAVA_COMMAND_SECTION3: "データパックとしてマインクラフトに読み込む",
  JAVA_COMMAND_SECTION4: "コマンドを実行",
  JAVA_COMMAND_TEXT1: "本アプリで画像を変換し，zipファイル(minecraftDot.zip)をダウンロードしておきます．",
  JAVA_COMMAND_TEXT2:
    "zipファイルをクリックして解凍してください．特別なソフトは必要ありません．クリックするだけで大丈夫です．",
  JAVA_COMMAND_TEXT3:
    "./minecraft/savesフォルダを開きます．その中にワールド名のフォルダが並んでいると思うので，コマンドを使用したいワールドを開きます．さらにdatapacksフォルダを開きます．./minecraft/saves/ワールド名/datapacks フォルダを開いていればOKです．その中に先ほど解凍して得られたフォルダ(dotフォルダ)を入れます.",
  JAVA_COMMAND_TEXT4:
    "最後にワールドに入りコマンドを入力します．/function フォルダ名:ファイル名と実行します．フォルダ名とはfunctionsフォルダが入っているフォルダ名です(デフォルトではdot_pack) ファイル名はfunctionsフォルダの中にあるmcfunctionファイルです(デフォルトではcmd)うまく読み込みが成功していれば，/functionを入力している段階でコマンドの候補が出てきます．コマンドに編集を行った場合，/reload を実行してください",

  // bedrock COMAMND
  BEDROCK_COMMAND_TITLE: "統合版(PC, android)のfunction実行方法",
  BEDROCK_COMMAND_SECTION1: "コマンドをダウンロードする",
  BEDROCK_COMMAND_SECTION2: "zipファイルを解凍",
  BEDROCK_COMMAND_SECTION3: "ビヘイビアーパックとしてマインクラフトに読み込む",
  BEDROCK_COMMAND_SECTION4: "アプリで読み込む",
  BEDROCK_COMMAND_SECTION5: "コマンドを実行",
  BEDROCK_COMMAND_TEXT1: "本アプリで画像を変換し，zipファイル(minecraftDot.zip)をダウンロードしておきます．",
  BEDROCK_COMMAND_TEXT2:
    "zipファイルをクリックして解凍してください．特別なソフトは必要ありません．クリックするだけで大丈夫です．",
  BEDROCK_COMMAND_TEXT3:
    "Minecraftのフォルダの中にあるdevelopment_behaivior_packsフォルダを開きます．WindowsではC:Users/ユーザ名/AppData/LocalPackages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/gamescom.mojangにあります．そこに先ほど解凍したフォルダ(dot_pack)を丸ごと入れます．最終的に以下のようなフォルダ構成になっていれば大丈夫です．",
  BEDROCK_COMMAND_TEXT4:
    "Minecraftアプリを開き，コマンドを実行したいワールドの設定画面を開きます．アドオンメニューからベヘイビアーパックを選択します．そしてマイパックの中にある先ほど作成したパックを選択し，有効にします",
  BEDROCK_COMMAND_TEXT5:
    "最後にワールドに入りコマンドを入力します．/function ファイル名 で実行します．例: /function cmd うまく読み込みが成功していれば，/functionを入力している段階でコマンドの候補が出てきます．複数コマンドがある場合は順番に実行してください．コマンドに編集を行った場合，/reload を実行してください．",

  // bedrock COMMAND iphone
  BEDROCK_IPHONE_COMMAND_TITLE: "統合版(iphone)のfunction実行方法",
  BEDROCK_IPHONE_COMMAND_SECTION1: "コマンドをダウンロードする",
  BEDROCK_IPHONE_COMMAND_SECTION2: "zipファイルを解凍",
  BEDROCK_IPHONE_COMMAND_SECTION3: "ビヘイビアーパックとしてマインクラフトに読み込む",
  BEDROCK_IPHONE_COMMAND_SECTION4: "アプリで読み込む",
  BEDROCK_IPHONE_COMMAND_SECTION5: "コマンドを実行",
  BEDROCK_IPHONE_COMMAND_TEXT1:
    "本アプリで画像を変換し，zipファイル(minecraftDot.zip)をダウンロードしておきます．デフォルトだとファイルアプリのダウンロードフォルダにzipファイルがダウンロードされます．この手順は必ず「safari」を使ってください",
  BEDROCK_IPHONE_COMMAND_TEXT2:
    "zipフ_IPHONWァイルをクリックして解凍してください．特別なソフトは必要ありません．クリックするだけで大丈夫です．",
  BEDROCK_IPHONE_COMMAND_TEXT3:
    "iphoneの「ファイル」アプリを開きます．その中に「Minecraft」フォルダがあるの思うので，そこから Minecraft -> games -> com.mojang -> development_behaivior_packsを開きます．そこに先ほど得られたフォルダを丸ごと入れます．フォルダを移動させるには移動したいフォルダを強く長押しして，移動を選択．その後，移動先のフォルダ（development_behaivior_packs）を選択します．最終的に以下のようなフォルダ構成になっていれば大丈夫です．",
  BEDROCK_IPHONE_COMMAND_TEXT4:
    "Minecraftアプリを開き，コマンドを実行したいワールドの設定画面を開きます．アドオンメニューからベヘイビアーパックを選択します．そしてマイパックの中にある先ほど作成したパックを選択し，有効にします",
  BEDROCK_IPHONE_COMMAND_TEXT5:
    "最後にワールドに入りコマンドを入力します．/function ファイル名 で実行します．例: /function cmd うまく読み込みが成功していれば，/functionを入力している段階でコマンドの候補が出てきます．複数コマンドがある場合は順番に実行してください．コマンドに編集を行った場合，/reload を実行してください．",

  // directory caption
  WORLD_NAME_DIR: "ワールド名",

  // Privacy
  PRIVACY_SECTION1: "当サービスは以下の情報を取得します",
  PRIVACY_SECTION2: "情報を利用する目的",
  PRIVACY_SECTION3: "アクセス解析ツール",
  PRIVACY_TEXT1:
    "Cookie(クッキー)を用いて生成された識別情報，OSが生成するID，端末の種類，端末識別子等のOSや端末に関する情報",
  PRIVACY_TEXT2: "当サービスにおけるお客様の行動履歴を分析し，当サービスの維持改善に役立てるため．",
  PRIVACY_TEXT3:
    "当サービスは，お客様のアクセス解析のために，「Googleアナリティクス」を利用しています．Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しています．トラフィックデータは匿名で収集されており，個人を特定するものではありません．",
  RETURN_HOME: "ホームに戻る",

  // SEO
  SEO_TITLE: "Minecraft Dot",
  SEO_DESCTIPTION:
    "写真をマインクラフトのドット絵に変換できるアプリ。画像、CSVファイルのダウンロードもできます。作成したドット絵はコマンドにしてゲーム内でドット絵を自動生成することも可能。ドット絵はエディタで細かく編集可能",
};
