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

    $('#form-reg').on('submit', function(e) {
        e.preventDefault()

        // ajax提交
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-form [name=username]').val(),
                password: $('.reg-form [name=password]').val()
            },
            success: function(res) {
                if (res.value !== 0) {
                    return alert(res.message)
                }
                alert(res.message)
            }
        })
    })
})