export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g);
  // map returns array
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
