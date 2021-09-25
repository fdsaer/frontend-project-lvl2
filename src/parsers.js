import yamlParser from 'js-yaml';

export default (fileContent, fileExtension) => {
  switch (fileExtension) {
    case ('json'):
      return JSON.parse(fileContent);
    case ('yml'):
    case ('yaml'):
      return yamlParser.load(fileContent);
    default:
      return {};
  }
};
