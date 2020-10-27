$(function() {
    $('.links-reg').on('click', function() {
        $('.login-form').hide()
        $('.reg-form').show()
    })
    $('.links-login').on('click', function() {
            $('.login-form').show()
            $('.reg-form').hide()
        })
        // 表单自定义校验
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-form [name=password]').val()
            if (value !== pwd) return '两次密码输入不一致,请重新输入'
        }
    })

    // 注册
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()

        // ajax提交
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-form [name=username]').val(),
                password: $('.reg-form [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('.links-login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    // 登录
    $('#form-login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })

})