document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('input');

    // 添加输入动画效果
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // 表单提交处理
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // 简单的表单验证
        if (!email || !password) {
            alert('请填写所有字段！');
            return;
        }

        if (!isValidEmail(email)) {
            alert('请输入有效的邮箱地址！');
            return;
        }

        // 这里可以添加登录逻辑
        console.log('登录信息：', { email, password });
        alert('登录请求已发送！');
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
