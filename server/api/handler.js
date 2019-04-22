function format(desc) {
  // remove html tags
  let res = desc.replace(/<[^>]*>/g, ' ')
  // limit length
  res = res.split(' ').slice(0, 30).join(' ')
  
  // add ellipsis
  if (res.endsWith(' ')) res = res + '...'
  else res = res + ' ...'
  
  return res
}

module.exports = (json, url) => {
  let items = json.rss.channel[0].item
  let res = []
  
  for (let item of items) {
    res.push({
      title: item.title[0],
      link: item.link[0],
      linkText: item.link[0].split('/')[2],
      content: format(item.description[0]),
      website: json.rss.channel[0].title[0],
      websiteLink: json.rss.channel[0].link[0],
      origin: url
    })
  }
  
  return res
}
