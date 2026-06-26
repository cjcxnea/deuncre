(function () {
  // 页面保护：只能通过index.html跳转访问
  const fromIndex = sessionStorage.getItem('fromIndex');
  if (fromIndex !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  // 加载JSON数据
  function loadJson(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/info.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }

  // 渲染用户信息到页面
  function renderUserInfo(data) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      window.location.href = 'index.html';
      return;
    }

    const user = data.userInfo.find(function (u) {
      return u.id === userId;
    });

    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    // 渲染考试科目
    document.getElementById('test-sub').textContent = user.testSub;

    // 渲染姓名
    document.getElementById('uname').value = user.uname;

    // 渲染证件号码
    document.getElementById('id-card').value = user.idCard;

    // 本地持久化：考试科目、姓名、证件号码
    localStorage.setItem('subject', user.testSub);
    localStorage.setItem('uname', user.uname);
    localStorage.setItem('idCard', user.idCard);
  }

  // 从localStorage恢复信息
  function restoreFromStorage() {
    const subject = localStorage.getItem('subject');
    const uname = localStorage.getItem('uname');
    const idCard = localStorage.getItem('idCard');

    if (subject) {
      document.getElementById('test-sub').textContent = subject;
    }
    if (uname) {
      document.getElementById('uname').value = uname;
    }
    if (idCard) {
      document.getElementById('id-card').value = idCard;
    }
  }

  // 查询验证
  function handleQuery(data) {
    const userId = localStorage.getItem('userId');
    const user = data.userInfo.find(function (u) {
      return u.id === userId;
    });

    if (!user) {
      alert('请输入正确的信息');
      return;
    }

    const unameInput = document.getElementById('uname');
    const idCardInput = document.getElementById('id-card');

    const uname = unameInput.value.trim();
    const idCard = idCardInput.value.trim();

    // 验证姓名和证件号码是否正确
    if (uname === user.uname && idCard === user.idCard) {
      // 更新本地持久化
      localStorage.setItem('uname', uname);
      localStorage.setItem('idCard', idCard);
      // 设置标记，允许score.html访问
      sessionStorage.setItem('fromHome', 'true');
      window.location.href = 'score.html';
    } else {
      alert('请输入正确的信息');
    }
  }

  // 初始化
  loadJson(function (data) {
    // 页面加载时渲染用户信息
    renderUserInfo(data);

    // 如果刷新后信息丢失，从localStorage恢复
    restoreFromStorage();

    // 查询按钮事件
    const form = document.querySelector('.form form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleQuery(data);
    });
  });
})();
