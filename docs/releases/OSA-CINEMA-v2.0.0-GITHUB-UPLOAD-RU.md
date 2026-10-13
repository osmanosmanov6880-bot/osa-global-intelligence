# OSA Cinema v2.0.0 — загрузка полного проекта в GitHub через браузер/Codespaces

Текущий репозиторий: https://github.com/osmanosmanov6880-bot/osa-global-intelligence
Исходный архив: `OSA_Cinema_Interactive_v2.0.0.zip`

## Почему требуется этот шаг
В текущем подключении GitHub доступно редактирование отдельных текстовых файлов через API, но нет операции массовой отправки локальной папки или бинарного ZIP в GitHub Releases. Поэтому полный перенос исходников нельзя безопасно выполнить одним доступным действием. Не создавайте фиктивный коммит, содержащий только README.

## Надёжный путь — Codespaces
1. Откройте репозиторий и нажмите **Code → Codespaces → Create codespace on main**.
2. В Codespaces откройте Explorer и загрузите ZIP в корень рабочей области через меню **… → Upload** (или используйте панель загрузки файлов, если она доступна в вашей версии интерфейса).
3. В терминале Codespaces выполните команды ниже. Если ZIP имеет другое имя, измените первую строку.
4. Проверьте `git status`, файлы `.env*`, затем выполните тесты. Только после проверки делайте commit и push.

```bash
unzip -q OSA_Cinema_Interactive_v2.0.0.zip -d /tmp/osa-cinema-release
cd /tmp/osa-cinema-release/OSA_Full_Production_Project

# Вернуться в корень клонированного репозитория:
cd "$CODESPACE_VSCODE_FOLDER"

# Резервная ветка — исходная main не перезаписывается напрямую:
git switch -c release/osa-cinema-v2.0.0

# Сначала убедитесь, что архив не содержит настоящих секретов.
# В проекте допускается .env.example, но запрещены .env.local и настоящие ключи.
find . -maxdepth 2 -type f -name '.env*' -print

# Скопировать содержимое проекта поверх репозитория, не копируя .git:
cp -a /tmp/osa-cinema-release/OSA_Full_Production_Project/. .

# Удалить временный ZIP из репозитория, если он был загружен туда:
rm -f OSA_Cinema_Interactive_v2.0.0.zip

git status --short
```

Перед коммитом обязательно проверьте изменения: не удаляйте пользовательские файлы или GitHub workflows, которых нет в архиве, без анализа diff. Если `main` содержит более новые изменения, перенесите release-ветку поверх актуального состояния вручную, а не применяйте слепую замену.

## Проверки в Codespaces

```bash
node --version
npm --version
npm ci
npm run test:contracts
npm run test:field-log
npm run test:intelligence
npm run test:ux
npm run test:pwa
npm run test:visual
npm run check:syntax
npm run typecheck
npm run lint
npm run build
```

Если `npm ci` сообщает об отсутствии `package-lock.json`, не подменяйте молча `npm ci` на установку с плавающими версиями: сначала проверьте `package.json`, создайте lockfile командой `npm install`, проверьте diff и закоммитьте lockfile. Если какая-либо проверка падает, исправьте причину до публикации.

```bash
git add -A
git commit -m "Release OSA Cinema v2.0.0"
git push -u origin release/osa-cinema-v2.0.0
```

После push откройте GitHub и создайте Pull Request из `release/osa-cinema-v2.0.0` в `main`. Просмотрите diff, дождитесь CI и только затем нажмите **Merge**.

## Безопасность
- Не коммитьте `.env.local`, `.env.production`, service-role keys, editor tokens, API keys, приватные сертификаты или пользовательские данные.
- Не отключайте проверки ради успешного зелёного статуса.
- ZIP содержит весь проект, а не только кинематографический модуль; review diff обязателен.
- Не включайте production-ключи в GitHub Actions variables, если workflow не нуждается в них.
