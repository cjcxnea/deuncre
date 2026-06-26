(function () {
  // 页面保护：只能通过home.html跳转访问
  const fromHome = sessionStorage.getItem('fromHome');
  if (fromHome !== 'true') {
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

  // 渲染成绩信息
  function renderScore(data) {
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

    // 渲染学生信息
    document.getElementById('uname').textContent = user.uname;
    document.getElementById('id-card').textContent = user.idCard;

    // 处理三个考试成绩列表
    var examLists = [
      {
        listId: 'exam-list-1',
        typeId: 'exam-type-1',
        itemId: 'exam-item-1',
        timeId: 'exam-item-1-time',
        isPassId: 'exam-item-1-is-pass',
        numId: 'exam-item-1-num',
        listVisible: user.examListOne,
        type: user.examTypeOne,
        item: user.examItemOne,
        time: user.examItemOneTime,
        isPass: user.examItemOneIsPass,
        num: user.examItemOneNum
      },
      {
        listId: 'exam-list-2',
        typeId: 'exam-type-2',
        itemId: 'exam-item-2',
        timeId: 'exam-item-2-time',
        isPassId: 'exam-item-2-is-pass',
        numId: 'exam-item-2-num',
        listVisible: user.examListTwo,
        type: user.examTypeTwo,
        item: user.examItemTwo,
        time: user.examItemTwoTime,
        isPass: user.examItemTwoIsPass,
        num: user.examItemTwoNum
      },
      {
        listId: 'exam-list-3',
        typeId: 'exam-type-3',
        itemId: 'exam-item-3',
        timeId: 'exam-item-3-time',
        isPassId: 'exam-item-3-is-pass',
        numId: 'exam-item-3-num',
        listVisible: user.examListThree,
        type: user.examTypeThree,
        item: user.examItemThree,
        time: user.examItemThreeTime,
        isPass: user.examItemThreeIsPass,
        num: user.examItemThreeNum
      }
    ];

    examLists.forEach(function (exam) {
      var listEl = document.getElementById(exam.listId);

      if (exam.listVisible === '0') {
        // 值为0时隐藏整个列表
        listEl.style.display = 'none';
        return;
      }

      // 值为1时正常显示
      listEl.style.display = '';

      // 处理考试类型标题
      var typeEl = document.getElementById(exam.typeId);
      if (exam.type === '0') {
        typeEl.style.display = 'none';
      } else {
        typeEl.style.display = '';
        typeEl.textContent = exam.type;
      }

      // 处理考试科目
      var itemEl = document.getElementById(exam.itemId);
      if (exam.item === '0') {
        itemEl.textContent = '';
      } else {
        itemEl.textContent = exam.item;
      }

      // 处理考试时间
      var timeEl = document.getElementById(exam.timeId);
      if (exam.time === '0') {
        timeEl.textContent = '';
      } else {
        timeEl.textContent = exam.time;
      }

      // 处理是否合格
      var isPassEl = document.getElementById(exam.isPassId);
      if (exam.isPass === 'n') {
        isPassEl.textContent = '不及格';
        isPassEl.style.color = 'red';
      } else {
        isPassEl.textContent = '合格';
        isPassEl.style.color = '';
      }

      // 处理准考证号
      var numEl = document.getElementById(exam.numId);
      if (exam.num === '0') {
        numEl.textContent = '';
      } else {
        numEl.textContent = exam.num;
      }
    });

    // 本地持久化成绩数据，保证刷新后信息不丢失
    localStorage.setItem('scoreData', JSON.stringify(user));
  }

  // 从localStorage恢复成绩数据
  function restoreFromStorage() {
    var scoreData = localStorage.getItem('scoreData');
    if (!scoreData) return;

    var user = JSON.parse(scoreData);

    document.getElementById('test-sub').textContent = user.testSub;
    document.getElementById('uname').textContent = user.uname;
    document.getElementById('id-card').textContent = user.idCard;

    var examLists = [
      {
        listId: 'exam-list-1',
        typeId: 'exam-type-1',
        itemId: 'exam-item-1',
        timeId: 'exam-item-1-time',
        isPassId: 'exam-item-1-is-pass',
        numId: 'exam-item-1-num',
        listVisible: user.examListOne,
        type: user.examTypeOne,
        item: user.examItemOne,
        time: user.examItemOneTime,
        isPass: user.examItemOneIsPass,
        num: user.examItemOneNum
      },
      {
        listId: 'exam-list-2',
        typeId: 'exam-type-2',
        itemId: 'exam-item-2',
        timeId: 'exam-item-2-time',
        isPassId: 'exam-item-2-is-pass',
        numId: 'exam-item-2-num',
        listVisible: user.examListTwo,
        type: user.examTypeTwo,
        item: user.examItemTwo,
        time: user.examItemTwoTime,
        isPass: user.examItemTwoIsPass,
        num: user.examItemTwoNum
      },
      {
        listId: 'exam-list-3',
        typeId: 'exam-type-3',
        itemId: 'exam-item-3',
        timeId: 'exam-item-3-time',
        isPassId: 'exam-item-3-is-pass',
        numId: 'exam-item-3-num',
        listVisible: user.examListThree,
        type: user.examTypeThree,
        item: user.examItemThree,
        time: user.examItemThreeTime,
        isPass: user.examItemThreeIsPass,
        num: user.examItemThreeNum
      }
    ];

    examLists.forEach(function (exam) {
      var listEl = document.getElementById(exam.listId);

      if (exam.listVisible === '0') {
        listEl.style.display = 'none';
        return;
      }

      listEl.style.display = '';

      var typeEl = document.getElementById(exam.typeId);
      if (exam.type === '0') {
        typeEl.style.display = 'none';
      } else {
        typeEl.style.display = '';
        typeEl.textContent = exam.type;
      }

      var itemEl = document.getElementById(exam.itemId);
      if (exam.item === '0') {
        itemEl.textContent = '';
      } else {
        itemEl.textContent = exam.item;
      }

      var timeEl = document.getElementById(exam.timeId);
      if (exam.time === '0') {
        timeEl.textContent = '';
      } else {
        timeEl.textContent = exam.time;
      }

      var isPassEl = document.getElementById(exam.isPassId);
      if (exam.isPass === 'n') {
        isPassEl.textContent = '不及格';
        isPassEl.style.color = 'red';
      } else {
        isPassEl.textContent = '合格';
        isPassEl.style.color = '';
      }

      var numEl = document.getElementById(exam.numId);
      if (exam.num === '0') {
        numEl.textContent = '';
      } else {
        numEl.textContent = exam.num;
      }
    });
  }

  // 初始化
  loadJson(function (data) {
    renderScore(data);

    // 如果刷新后信息丢失，从localStorage恢复
    restoreFromStorage();

    // 返回继续查询按钮
    var backBtn = document.querySelector('.btn-back');
    backBtn.addEventListener('click', function () {
      // 设置标记，允许home.html正常访问
      sessionStorage.setItem('fromIndex', 'true');
      window.location.href = 'home.html';
    });

    // 补办合格证明书按钮
    var certBtn = document.querySelector('.btn-2');
    certBtn.addEventListener('click', function () {
      alert('网络繁忙，请稍后重试');
    });
  });
})();
