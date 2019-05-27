const moment = require('moment')

function format(desc) {
  // remove html tags
  let res = desc.replace(/<[^>]*>/g, ' ')
  
  // limit length + add ellipsis
  if (res.split(' ').length >= 40) {
    res = res.split(' ').slice(0, 40).join(' ')
    if (res.endsWith(' ')) res = res + '...'
    else res = res + ' ...'
  }
  
  return res
}

module.exports = (json, url) => {
  let res = []
  
  if (json.feed) {
    console.log('atom')
    let items = json.feed.entry  
    for (let item of items) {
      res.push({
        title: item.title[0],
        link: item.link[0].$.href,
        linkText: item.link[0].$.href.split('/')[2],
        content: format(item.content[0]._),
        website: json.feed.title[0],
        time: moment(item.updated[0], "YYYY-MM-DDTHH:mm:ssZ").format('X'),
        fuzzyTime: moment(item.updated[0], "YYYY-MM-DDTHH:mm:ssZ").fromNow()
      })
    }
  } else if (json.rss) {
    console.log('rss')
    let items = json.rss.channel[0].item  
    for (let item of items) {
      res.push({
        title: item.title[0],
        link: item.link[0],
        linkText: item.link[0].split('/')[2],
        content: format(item.description[0]),
        website: json.rss.channel[0].title[0],
        time: moment(item.pubDate[0], "ddd, DD MMM YYYY HH:mm:ss Z").format('X'),
        fuzzyTime: moment(item.pubDate[0], "ddd, DD MMM YYYY HH:mm:ss Z").fromNow()
      })
    }
  }
  
  console.log(res[0])
  return res
}
