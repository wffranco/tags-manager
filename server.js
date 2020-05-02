const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const uid = require('uid');
const randomColor = require('random-color');
const fs = require('fs');

let tags = [];

function syncTags(save = true) {
  io.sockets.emit('UPDATE_TAGS', tags);
  if (save) fs.writeFileSync('./tags.json', JSON.stringify(tags));
}

function newId() {
  let id = uid();
  while (tags.find(tag => tag.id === id)) id = uid();
  return id;
}

// load saved tags
fs.readFile('./tags.json', (err, data) => {
  if (err) return;
  tags = JSON.parse(data);
  syncTags(false);
});

app.get('/tags', (req, res) => {
  res.json(tags);
});

io.on('connection', (socket) => {
  console.log('User Connected');
  io.sockets.emit('CONNECTED');
  syncTags();

  socket.on('disconnect', () => {
    console.log('User Disconnected');
    io.sockets.emit('DISCONNECTED');
  });

  socket.on('insert_tag', (name) => {
    console.log('insert tag: ', name);
    tags.push({
      id: newId(),
      color: randomColor().hexString(),
      name,
    });
    syncTags();
  });

  socket.on('update_tag', ({name, id}) => {
    const tag = tags.find(tag => tag.id === id);
    if (tag) {
      tag.name = name;
      console.log('tag name updated: ', name);
      syncTags();
    } else  {
      console.log('tag not found.');
    }
  });

  socket.on('remove_tag', ({id}) => {
    const pos = tags.findIndex(tag => tag.id === id);
    console.log('remove_tag:', pos, tags[pos]);
    if (pos) {
      const removed = tags.splice(pos, 1);
      console.log('tags removed: ', removed);
      syncTags();
    } else  {
      console.log('tag not found.');
    }
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
