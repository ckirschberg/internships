import { InternshipsPage } from './app.po';

describe('internships App', function() {
  let page: InternshipsPage;

  beforeEach(() => {
    page = new InternshipsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
