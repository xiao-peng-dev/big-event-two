$(function() {
    var form = layui.form
        // 验证用户昵称
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称不能超过6位'
            }
        }
    })

    // 获取表单信息
    getUserInfo()
    var layer = layui.layer


    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            // data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                form.val('formUser', res.data); //表单渲染
            }
        })
    }
    //  重置功能
    $('#btnRset').on('click', function(e) {
            e.preventDefault()
            getUserInfo()
        })
        // 修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                window.parent.getInfo();
            }
        })
    })
})