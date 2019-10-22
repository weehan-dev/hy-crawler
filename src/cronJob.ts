import loader from './loaders';
import dietCrawler from './services/dietCrawler';

exports.diet = async (event, context) => {
  await loader();
};
