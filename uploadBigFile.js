// 大文件上传 伪代码!!!
// 上传整体思路-前端
// 核心是利用 Blob.prototype.slice 方法，文件的 slice 方法可以返回原文件的某个切片
// 预先定义好单个切片大小，将文件切分为一个个切片，然后借助 http 的可并发性，同时上传多个切片。这样从原本传一个大文件，变成了并发传多个小的文件切片，可以大大减少上传时间
// 由于是并发，传输到服务端的顺序可能会发生变化，因此我们还需要给每个切片记录顺序
const html = `
  <input type="file" @change="handleFileChange" />
  <el-button @click="handleUpload">上传</el-button>
`;

// 定义切片大小
const SIZE = 10 * 1024 * 1024;

function handleFileChange(e) {
  const [file] = e.target.files;
  if(!file) return;
  this.file = file;
}

async function handleUpload() {
  if(!this.file) return;
  // 首先对文件切片
  const fileChunkList = createFileChunk(this.file);
  // 对 fileChunkList 洗一遍
  this.data = fileChunkList.map(({file}, index) => {
    return {
      chunk: file,
      hash: this.file.name + "-" + index
    }
  })
  // 开始上传
  await uploadChunks();
}

function createFileChunk(file, size=SIZE) {
  const fileChunkList = [];
  let cur = 0;
  while(cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur+size)
    })
    cur += size;
  }
  return fileChunkList;
}

async function uploadChunks() {
  const formDataList = this.data.map(({chunk, hash}) => {
    // 注意用 FormData 构建
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash);
    formData.append('fileName', this.file.name);
    return { formData };
  });
  const requestList = formDataList.map(({formData}) => {
    fetch('http://localhost:3000', {
      method: 'PUT',
      body: formData
    })
  });
  await Promise.all(requestList); // 并发上传ajax请求
  // 上传完成所有的文件切片，我们告诉服务端，开始合并
  await mergeRequest();
}

// 合并切片的ajax请求
async function mergeRequest() {
  await fetch('http://localhost:3000/merge', {
    body: JSON.stringify({
      filename: this.file.name
    })
  })
}
