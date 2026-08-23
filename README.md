## My portfolio website 2023, "sgw_studio."

[sgw_studio](http://shagawa.work/)

## Installation

```sh
gatsby develop
```

## packages

- [react-emojis](https://www.sejuku.net/blog/)

## node version

v18.0.0

## Next.js (SSG) 移行メモ

現行のGatsby構成をNext.js（TypeScriptなし、SSR不使用・完全SSG）に移行する場合の必要事項。

### 前提
- Pages Router（App Routerは使わない）
- `next.config.js` に `output: "export"` を設定し、`next build` で静的HTMLを出力
- ISR・API Routesは使わない（現行と同じくビルド時に全て固める）

### 移行が必要な項目

1. **データ取得層の作り替え**
   - `gatsby-source-wordpress` が担っていたWPGraphQLのビルド時キャッシュがなくなる
   - `getStaticProps` / `getStaticPaths` 内で `graphql-request` 等を使い `https://api.shagawa.work/graphql` を直接フェッチする実装に置き換え

2. **動的ページ生成の書き換え**
   - `gatsby-node.js` の `createPages`（`/worklist/1`, `/worklist/2`... のページネーション）を `getStaticPaths` + `getStaticProps` に移植
   - `src/pages/works/{WpPost.uri}.js` のような動的slugルーティングは `pages/works/[uri].js` 形式に変更

3. **i18n**
   - `gatsby-plugin-react-i18next` → `next-i18next` に置き換え
   - `locales/en`, `locales/ja` の翻訳JSONはそのまま流用可能

4. **画像最適化**
   - `gatsby-plugin-image` → `next/image`
   - `next.config.js` の `images.domains`（または `remotePatterns`）にWPメディアのドメインを追加

5. **SEO**
   - `react-helmet` → `next/head`（Pages Router）にほぼ機械的に置換可能

6. **ダークモード**
   - `gatsby-plugin-dark-mode` → `next-themes` 等に置き換え

7. **デプロイフロー**
   - 現行の [.github/workflows/deploy.yml](.github/workflows/deploy.yml)（`dev`ブランチpush → `gatsby build` → `peaceiris/actions-gh-pages` でmainへpublish）は、ビルドコマンドを `next build`（`output: "export"`で`out/`を生成）に差し替えるだけでほぼ流用可能
   - `gatsby-plugin-htaccess` はNextに直接の代替がないため、必要なら `public/.htaccess` を手動配置する形に変更

8. **WordPress更新の反映タイミング（要検討）**
   - SSGなのでWP側の記事更新はビルドし直さない限り反映されない点はGatsbyと同じ
   - 自動再ビルドが必要な場合、WP側のwebhookからGitHub Actionsを `repository_dispatch` 等でトリガーする仕組みを別途追加する必要あり（現行構成には未実装）

### そのまま流用できるもの
- Tailwind / PostCSS設定（[tailwind.config.js](tailwind.config.js)、[postcss.config.js](postcss.config.js)）
- `content/` 配下のJSON・画像ベースのコンテンツ
- 各UIコンポーネント（Hero, About, Skills, Timeline, Cards等）はGatsby固有API依存が薄いため大部分はそのまま移植可能
