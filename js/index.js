(function () {
  // 验证码图片路径前缀
  const imgBase = 'verify-code-img/';
  // 当前验证码对应的code
  let currentCode = '';

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

  // 随机加载验证码图片
  function loadVerifyCode(data) {
    const verifyList = data.verifyInfo;
    const index = Math.floor(Math.random() * verifyList.length);
    const item = verifyList[index];
    currentCode = item.code;
    const img = document.querySelector('.verif-code img');
    img.src = imgBase + item.picName;
  }

  // 登录验证
  function handleLogin(data) {
    const idCardInput = document.getElementById('idCard');
    const passwordInput = document.getElementById('password');
    const verifCodeInput = document.getElementById('verifCode');

    const idCard = idCardInput.value.trim();
    const password = passwordInput.value.trim();
    const verifCode = verifCodeInput.value.trim();

    // 验证码不区分大小写
    if (verifCode.toLowerCase() !== currentCode.toLowerCase()) {
      alert('请输入正确的登录信息');
      return;
    }

    // 验证证件号码和密码
    const user = data.userInfo.find(function (u) {
      return u.idCard === idCard && u.password === password;
    });

    if (user) {
      // 登录成功，将用户id存入localStorage
      localStorage.setItem('userId', user.id);
      // 设置标记，允许home.html访问
      sessionStorage.setItem('fromIndex', 'true');
      window.location.href = 'home.html';
    } else {
      alert('请输入正确的登录信息');
    }
  }

  // 初始化
  loadJson(function (data) {
    // 页面加载时随机加载验证码
    loadVerifyCode(data);

    // 点击验证码图片刷新
    const verifImg = document.querySelector('.verif-code img');
    verifImg.style.cursor = 'pointer';
    verifImg.addEventListener('click', function () {
      loadVerifyCode(data);
    });

    // 登录按钮事件
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleLogin(data);
    });

    // 密码显示/隐藏切换
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordInput = document.getElementById('password');
    const eyeOpen = eyeIcon.querySelector('.eye-open');
    const eyeClose = eyeIcon.querySelector('.eye-close');
    eyeIcon.addEventListener('click', function () {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClose.style.display = 'block';
      } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClose.style.display = 'none';
      }
    });
  });
})();
