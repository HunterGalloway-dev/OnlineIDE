import { CodeFile } from './file';

describe('File', () => {
  it('should create an instance', () => {
    expect(new CodeFile("","")).toBeTruthy();
  });
});
