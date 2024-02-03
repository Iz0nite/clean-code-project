function formatTagsToArray (tags) {
  return typeof tags === "string" ? [ tags ] : tags
}

module.exports = { formatTagsToArray }