$(document).ready(function () {
    $(document).on("click", ".back-page", function () {
        $('#myTab a[href="#tab2"]').tab('show');
    });
    setInterval(tbAjaxcongviecdanhan, 5000);
    setInterval(tbAjaxbaocaocongviec, 5000);
    setInterval(tbAjaxcongviecdaxong, 5000);
    setInterval(tbAjaxcongviecho, 5000);

});


function tbAjaxcongviecho() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxcongviecho",
        contentType: "application/json; charset=utf-8",

        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';

            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                if (value["Qadmin"] == "True") {
                    html += '<div class="dropdown">';
                    html += '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân công chính</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listnhanvien'], function (index1, value1) {
                        html += '<div class="dropdown-item" onclick="tbAjaxPhanCongCongViec(\'' + id + '\',\'' + value1["manv"] + '\',\'' + value1["hoten"] + '\')">' + value1["hoten"] + '</div>';
                    });
                    html += '</div> </div>';
                }
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Công việc: ' + value["congviec"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Mô tả:  ' + value["mota"] + '</h6>';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Khoa: ' + value["tenkhoayeucau"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG tạo: ' + value["ngaygiotao"] + '</h6>';
                html += '<div class="btn btn-outline-success"  onclick="tbAjaxPhanCongCongViec(\'' + value["id"] + '\',\'' + value["manv"] + '\',\'' + value["hotennv"] + '\')">';
                html += '<i class="fas fa-check"></i>  ' + "Nhận công việc" + '</div > ';
                if (value["Qadmin"] == "True") {
                    html += '<div class="btn btn-outline-danger"  onclick="tbAjaxXoaCongViec(\'' + value["id"] + '\',\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-times"></i>  ' + "Xóa công việc" + '</div > ';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistcongvieccho').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistcongvieccho').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}

//Công việc đã nhận
function tbAjaxcongviecdanhan() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxcongviecdanhan",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                if (value["Qadmin"] == "True") {
                    html += '<div class="dropdown">';
                    html += '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân công công việc</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listnhanvien'], function (index1, value1) {
                        html += '<div class="dropdown-item" onclick="tbAjaxPhanCongCongViec(\'' + id + '\',\'' + value1["manv"] + '\',\'' + value1["hoten"] + '\')">' + value1["hoten"] + '</div>';
                    });
                    html += '</div> </div>';
                    html += '<div class="dropdown">';
                    html += '<button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phân công hỗ trợ</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listnhanvien'], function (index2, value2) {
                        html += '<div class="dropdown-item" onclick="tbAjaxCapNhatNVHTCongViec(\'' + id + '\',\'' + value2["manv"] + '\',\'' + value2["hoten"] + '\')">' + value2["hoten"] + '</div>';
                    });
                    html += '</div> </div>';
                }
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Công việc: ' + value["congviec"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Mô tả:  ' + value["mota"] + '</h6>';
                html += '<div class="btn btn-outline-secondary" onclick="tbAjaxThemMoTaCongViec(\'' + value["id"] + '\')">';
                html += '<i class="fas fa-check"></i>  ' + "Thêm mô tả" + '</div > ';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Khoa: ' + value["tenkhoayeucau"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG tạo: ' + value["ngaygiotao"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG nhận: ' + value["ngaygionhan"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Nhân viên: ' + value["manv"] + ': ' + value["hotennv"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Hỗ trợ: ' + value["nhanvienhotro"] + '</h6>';
                html += '<div class="btn btn-outline-success"onclick="tbAjaxHoanThanhCongViec(\'' + value["id"] + '\',\'' + value["id"] + '\')">';
                html += '<i class="fas fa-check"></i>  ' + "Hoàn tất" + '</div > ';
                if (value["Qadmin"] == "True") {
                    // html += '<div class="btn btn-outline-primary" onclick="tbAjaxHuyNhanCongViec(\'' + value["id"] + '\')">';
                    // html += '<i class="fas fa-check"></i>  ' + "Hủy nhận" + '</div > ';
                    html += '<div class="btn btn-outline-danger"  onclick="tbAjaxXoaCongViec(\'' + value["id"] + '\',\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-times"></i>  ' + "Xóa" + '</div > ';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistcongviecdanhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-8" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-2" title="">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistcongviecdanhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}

function tbAjaxcongviecdaxong() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxcongviecdaxong",
        contentType: "application/json; charset=utf-8",
        data: "{ 'TUNGAYXONG' : '" + $("#tungaydaxong").val() + "','DENNGAYXONG' : '" + $("#denngaydaxong").val() + "','TIMKIEMXONG' : '" + $("#timkiemdaxong").val() + "' }",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            html += '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                if (value["Qadmin"] == "True") {
                    html += '<div class="dropdown">';
                    html += '<button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Đánh giá</button>';
                    html += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
                    var id = value["id"];
                    $.each(value['listxldanhgia'], function (index2, value2) {
                        html += '<div class="dropdown-item" onclick="tbAjaxDanhGiaCongViec(\'' + id + '\',\'' + value2["danhgia"] + '\')">' + value2["danhgia"] + '</div>';
                    });
                    html += '</div> </div>';
                }
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Công việc: ' + value["congviec"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Mô tả:  ' + value["mota"] + '</h6>';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Khoa: ' + value["tenkhoayeucau"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG tạo: ' + value["ngaygiotao"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG nhận: ' + value["ngaygionhan"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG hoàn thành: ' + value["ngaygiohoanthanh"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Nhân viên: ' + value["manv"] + ': ' + value["hotennv"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Đánh giá: ' + value["danhgia"] + '</h6>';
                if (value["Qadmin"] == "True") {
                    html += '<div class="btn btn-outline-primary" onclick="tbAjaxYeuCauLamLaiCongViec(\'' + value["id"] + '\')">';
                    html += '<i class="fas fa-check"></i>  ' + "Yêu cầu làm lại" + '</div > ';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laylistcongviecdaxong').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laylistcongviecdaxong').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}
//Báo cáo công việc
function tbAjaxbaocaocongviec() {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxbaocaocongviec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'tungaybaocao' : '" + $("#tungaybaocao").val() + "','denngaybaocao' : '" + $("#denngaybaocao").val() + "','timkiembaocao' : '" + $("#timkiembaocao").val() + "' }",
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            html += '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["id"] + '" ">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                html += '<h6 class="text-danger"> <i class="fas fa-hospital-alt"></i> Mã nhân viên: ' + value["manv"] + '</h6>';
                html += '<h6 class="text-success"> <i class="fas fa-address-card"></i> Họ tên:  ' + value["hotennv"] + '</h6>';
                html += '<h6 class="text-info"> <i class="fas fa-university"></i> Số công việc: ' + value["socongviec"] + '</h6>';
                 html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG trung bình (phút): ' + value["trungbinhphut"] + '</h6>';
                 html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> TG lâu nhất (phút): ' + value["caonhatphut"] + '</h6>';
                html += '<h6 class="text-white"> <i class="fas fa-calendar"></i> Công việc tiêu biểu: ' + value["lydo"] + '</h6>';
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#laybaocaocongviec').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin công việc</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#laybaocaocongviec').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}


//-------------------------
function tbAjaxXoaCongViec(ID, TEN) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxXoaCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','TEN' : '" + TEN + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10" title="">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            //$('#msg').html(data).fadeIn('slow');
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không xóa được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

function tbAjaxHuyNhanCongViec(ID) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxHuyNhanCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10" title="">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không xóa được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

function tbAjaxHoanThanhCongViec(ID, MANV) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxHoanThanhCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MANV' : '" + MANV + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không hoàn thành được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}


function tbAjaxPhanCongCongViec(ID, MANV, HOTEN) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxPhanCongCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MANV' : '" + MANV + "','HOTEN' : '" + HOTEN + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không phân công được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

function tbAjaxCapNhatNVHTCongViec(ID, MANV, HOTEN) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxCapNhatNVHTCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MANV' : '" + MANV + "','HOTEN' : '" + HOTEN + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không phân công được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

// Yêu cầu làm lại
function tbAjaxYeuCauLamLaiCongViec(ID) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxYeuCauLamLaiCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10" title="">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            //$('#msg').html(data).fadeIn('slow');
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không yêu cầu làm lại được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

//Đánh giá công việc
function tbAjaxDanhGiaCongViec(ID, DANHGIA) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxDanhGiaCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','DANHGIA' : '" + DANHGIA + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không đánh giá được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}

//Thêm mô tả
function tbAjaxThemMoTaCongViec(ID) {
    $.ajax({
        type: "POST",
        url: "indexQLCV.aspx/tbAjaxThemMoTaCongViec",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "','MOTA' : '" + $("#txtthemmota").val() + "'}",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-2"></div>';
                html += '<div class="col-md-10">';
                html += '<h6 class="text-primary">' + value["ketqua"] + '</h6>';
                html += '</div>'
            });
            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
            document.getElementById("txtthemmota").value = "";
        },
        error: function (error) {
            var html = '<div class="col-md-2"></div>';
            html += '<div class="col-md-10" title="">';
            html += '<h6 class="text-primary">Không đánh giá được công việc, lỗi kết nối</h6>';
            html += '</div>';

            $('#congviec_ketqua').html(html);
            $('#congviec_ketqua').html(html).fadeIn('slow') //also show a success message 
            $('#congviec_ketqua').delay(5000).fadeOut('slow');
        }
    });
}
