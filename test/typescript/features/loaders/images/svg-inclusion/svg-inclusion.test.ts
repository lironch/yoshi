import Scripts from '../../../../../scripts';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'typescript',
});

describe.each(['prod', 'dev'] as const)('svg inclusion [%s]', mode => {
  it('integration', async () => {
    await scripts[mode](async () => {
      await page.goto(scripts.serverUrl);
      const imageSource = await page.$eval(
        '#svg-inclusion',
        elm => (elm as HTMLImageElement).src,
      );

      expect(imageSource).toMatch(/data:image\/svg.+/);
    });
  });

  it('component tests', async () => {
    await scripts.test(mode);
  });
});
