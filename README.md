
1. Change `reactjs.org` submodule to your git cloned one.
2. Change `.env.example` to `.env`, and set your `OPENAI_API_KEY` in `.env`.
3. Use `docker-compose run --rm chatgpt sh` run docker. It mount `reactjs.org/beta/src/content` to `/docs`.
4. You may neet to run `npm install` in docker shell
5. Run `ts-node index.ts` to translate a file in reactjs.org/beta/src/content to the language you selected.

https://github.com/josephMG/chatGPT-translate-docs/blob/main/chatGPT/index.ts#L75-L79
If you want to translate all files in content, remove comment on line 77.
