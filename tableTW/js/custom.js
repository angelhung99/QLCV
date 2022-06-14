$(document).ready(function () {
	$(document).on("click",".back-page",function() {
		$('#myTab a[href="#tab4"]').tab('show');
	});

    setInterval(tbAjaxCenter, 5000);
});
function tbAjaxThongTinBN() {
    $.ajax({
        type: "POST",
        url: "DieuChinh_ThongTinBN_frm.aspx/dcbn_btntimkiem_click",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + document.getElementById('<%=dcttbn_txtmabaql.ClientID%>').value + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                html += '<h6 class="text-success"> <i class="fas fa-hospital-alt"></i>  ' + value["Hoten"] + '</h6>';
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#layTTBenhnhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin bệnh nhân/div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#layTTBenhnhan').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}
function tbAjaxCenter() {
    $.ajax({
        type: "POST",
        url: "index.aspx/tbAjaxCenter",
        contentType: "application/json; charset=utf-8",
        
        dataType: "json",
        success: function (data) {
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            $.each(objects, function (index, value) {
                html += '<div class="col-md-4" title="' + value["matrungtam"] + '" onclick="tbAjaxDept(\'' + value["matrungtam"] + '\')">';
                html += '<div class="card mb-4 shadow-sm">';
                html += '<div class="card-body">';
                html += '<h6 class="text-success"> <i class="fas fa-hospital-alt"></i>  ' + value["tentrungtam"] + '</h6>';
                html += '</div>';
                html += '</div>';
                html += '</div>'

            });

            $('#layDSTrungtam').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin trung tâm</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#layDSTrungtam').html(html);
            //$('#myTab a[href="#tab1"]').tab('show');
        }
    });
}



function tbAjaxDept(ID) {
    $.ajax({
        type: "POST",
        url: "index.aspx/tbAjaxDept",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var html = '<div class="col-md-2" title=""></div>';
            html += '<div class="col-md-8" title="">';
           // html += '<input type="text" class="form-control" id="pwd" placeholder="Tìm kiếm theo tên khoa" name="pwd"/>';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
           // html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';
            html += '<div class="col-md-4" title="">';
            html += '<div class="card mb-4 shadow-sm btn-danger">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Công suất giường >= 100%</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-4" title="">';
            html += '<div class="card mb-4 shadow-sm btn-warning">';
            html += '<div class="card-body">';
            html += '<p class="card-text">100% > Công suất giường >= 70%</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-4" title="">';
            html += '<div class="card mb-4 shadow-sm btn-success">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Công suất giường < 70%</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            $.each(objects, function (index, value) {
                var percent = Math.round(value["slBenhNhan"] / value["slGiuong"] * 100);
                if (window.screen.width <= 600) {
                    if (percent <= 30) {
                        html += '<div class="col-6" title="' + value["tenkhoa"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-success">';
                        html += '<div class="card-body">';
                        html += '<p><small>' + value["MakhoaQL"] + '(' + value["slBenhNhan"] + '/' + value["slGiuong"] + ') ' + percent + '%</small></p>';
                        html += '<p><small>' + value["tenkhoa"].substring(0, 20) + '...</small></p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else if (percent > 30 && percent <= 70) {
                        html += '<div class="col-6" title="' + value["tenkhoa"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-success">';
                        html += '<div class="card-body">';
                        html += '<p><small>' + value["MakhoaQL"] + '(' + value["slBenhNhan"] + '/' + value["slGiuong"] + ') ' + percent + '%</small></p>';
                        html += '<p><small>' + value["tenkhoa"].substring(0, 20) + '...</small></p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else if (percent && percent <= 100) {
                        html += '<div class="col-6" title="' + value["tenkhoa"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-warning">';
                        html += '<div class="card-body">';
                        html += '<p><small>' + value["MakhoaQL"] + '(' + value["slBenhNhan"] + '/' + value["slGiuong"] + ') ' + percent + '%</small></p>';
                        html += '<p><small>' + value["tenkhoa"].substring(0, 20) + '...</small></p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else {
                        html += '<div class="col-6" title="' + value["tenkhoa"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-danger">';
                        html += '<div class="card-body">';
                        html += '<p class="card-text">' + value["MakhoaQL"] + '(' + value["slBenhNhan"] + '/' + value["slGiuong"] + ') ' + percent + '%</p>';
                        html += '<p><small>' + value["tenkhoa"].substring(0, 20) + '...</small></p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                } else {
                    if (percent <= 30) {
                        html += '<div class="col-md-4" title="' + value["MakhoaQL"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm">';
                        html += '<div class="card-body">';
                        html += '<h5 class="text-success">' + value["tenkhoa"] + '</h5>';
                        html += '<p class="card-text">' + 'Bệnh nhân: ' + value["slBenhNhan"] + '  Giường: ' + value["slGiuong"] + '  Tỷ lệ: ' + percent + '%</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else if (percent > 30 && percent <70) {
                        html += '<div class="col-md-4" title="' + value["MakhoaQL"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm">';
                        html += '<div class="card-body">';
                        html += '<h5 class="text-success">' + value["tenkhoa"] + '</h5>';
                        html += '<p class="card-text">' + 'Bệnh nhân: ' + value["slBenhNhan"] + '  Giường: ' + value["slGiuong"] + '  Tỷ lệ: ' + percent + '%</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else if (percent && percent <= 100) {
                        html += '<div class="col-md-4" title="' + value["MakhoaQL"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm">';
                        html += '<div class="card-body">';
                        html += '<h5 class="text-warning">' + value["tenkhoa"] + '</h5>';
                        html += '<p class="card-text">' + 'Bệnh nhân: ' + value["slBenhNhan"] + '  Giường: ' + value["slGiuong"] + '  Tỷ lệ: ' + percent + '%</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else {
                        html += '<div class="col-md-4" title="' + value["MakhoaQL"] + '" onclick="tbAjaxBed(\'' + value["Makhoa"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm">';
                        html += '<div class="card-body">';
                        html += '<h5 class="text-danger">' + value["tenkhoa"] + '</h5>';
                        html += '<p class="card-text">' + 'Bệnh nhân: ' + value["slBenhNhan"] + '  Giường: ' + value["slGiuong"] + '  Tỷ lệ: ' + percent + '%</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                }
            });

            $('#layDSKhoa').html(html);
            $('#myTab a[href="#tab1"]').tab('show');
        },
        error: function (error) {
            var html = '<div class="col-md-2" title=""></div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="pwd" placeholder="Tìm kiếm theo tên khoa" name="pwd"/>';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#layDSKhoa').html(html);
            $('#myTab a[href="#tab1"]').tab('show');
        }
    });
}

function tbAjaxBed(ID) {
    $.ajax({
        type: "POST",
        url: "index.aspx/tbAjaxBed",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            var html = '';
            html += '<div class="col-md-4" title="">';
            html += '<h4 class="card-text text-white">Ngày hiện tại: ' + today+'</h4>'
            html += '</div>';
            html += '<div class="col-md-8" title="">';
            html += ' <h3 class="card-text text-white">&nbsp' + objects[1]["tenkhoa"] + '</h3> <p>&nbsp</p>';
           // html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            // += '<div class="col-md-2" title="">';
           // html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
           // html += '</div>';
            html += '<div class="col-md-12" title="">';
            html += '<div class="card mb-4 shadow-sm btn-default">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Mã giường(SL ngày giường)(SL Bệnh)</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<div class="card mb-4 shadow-sm">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Không có BN</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<div class="card mb-4 shadow-sm btn-success">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Đúng(nằm đơn)</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<div class="card mb-4 shadow-sm btn-info">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Đúng(nằm ghép)</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-4" title="">';
            html += '<div class="card mb-4 shadow-sm btn-warning">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Ngày giường > 1</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<div class="card mb-4 shadow-sm btn-danger">';
            html += '<div class="card-body">';
            html += '<p class="card-text">Sai ngày giường</p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
          

            $.each(objects, function (index, value) {
                if (value["slBenhNhan"] <= 0) {
                    if (value["slbntt"] == 0) {
                        html += '<div class="col-md-2">';
                        html += '<div class="card mb-4 shadow-sm">';
                        html += '<div class="card-body">';
                        html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    } else {
                        html += '<div class="col-md-2"' + 'onclick="tbAjaxPer(\'' + value["makhoa"] + '-' + value["SoGiuong"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-default">';
                        html += '<div class="card-body">';
                        html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                }
                else if (value["slBenhNhan"] <= 1) {
                    if (value["slbntt"] = 1) {
                        html += '<div class="col-md-2"' + 'onclick="tbAjaxPer(\'' + value["makhoa"] + '-' + value["SoGiuong"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-success">';
                        html += '<div class="card-body">';
                        html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                    else {
                        html += '<div class="col-md-2"' + 'onclick="tbAjaxPer(\'' + value["makhoa"] + '-' + value["SoGiuong"] + '\')">';
                        html += '<div class="card mb-4 shadow-sm btn-info">';
                        html += '<div class="card-body">';
                        html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>'
                    }
                }
                else if (value["slBenhNhan"] > 1) {
                    if (value["slbntt"] <= 1) {
                    html += '<div class="col-md-2"' + 'onclick="tbAjaxPer(\'' + value["makhoa"] + '-' + value["SoGiuong"] + '\')">';
                    html += '<div class="card mb-4 shadow-sm btn-warning">';
                    html += '<div class="card-body">';
                    html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                    html += '</div>';
                    html += '</div>';
                        html += '</div>';
                    } else {
                        
                            html += '<div class="col-md-2"' + 'onclick="tbAjaxPer(\'' + value["makhoa"] + '-' + value["SoGiuong"] + '\')">';
                            html += '<div class="card mb-4 shadow-sm btn-danger">';
                            html += '<div class="card-body">';
                            html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                    }
                }
                else {
                    html += '<div class="col-md-2"' + 'onclick="tbAjaxPer(\'' + value["makhoa"] + '-' + value["SoGiuong"] +'\')">';
                    html += '<div class="card mb-4 shadow-sm btn-danger">';
                    html += '<div class="card-body">';
                    html += '<p class="card-text">' + value["SoGiuong"] + '(' + value["slBenhNhan"] + ')(' + value["slbntt"] + ')</p>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>'
                }
            });

            $('#layDSGiuong').html(html);
            $('#myTab a[href="#tab2"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title=""></div>';
            html += '<div class="col-md-8" title="">';
            //html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            //html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#layDSGiuong').html(html);
            $('#myTab a[href="#tab2"]').tab('show');
        }
    });
}

function tbAjaxPer(ID) {
    $.ajax({
        type: "POST",
        url: "index.aspx/tbAjaxPer",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ID' : '" + ID + "' }",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var objects = $.parseJSON(data.d);
            var hostname = window.location.hostname;
            var html = '';
            html += '<div class="col-md-8" title="">';
            //html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-4" title="">';
            //html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '</div>';
            //html +='<div class="col-md-2" title=""> <button class="btn-default back-page">Trở về</button></div>'
            html += '<div class="col-md-12" title=""><p>&nbsp</p><h3 class="card-text text-white">Tên khoa: ' + objects[0]["tenkhoa"] + ' Số giường: ' + objects[0]["SoGiuong"]+'</h3><p>&nbsp</p>';
            html += '</div>';
           

            $.each(objects, function (index, value) {
                html += '<div class="col-md-4">';
                html += '<div class="card mb-12 shadow-sm btn-success">';
                    html += '<div class="card-body">';
                html += '<p class="card-text"> Mã bệnh án: ' + value["mabn"] + '</p>';
                html += '<p class="card-text"> Họ và tên: ' + value["Hoten"] + '</p>';
                html += '<p class="card-text"> SL ngày giường: ' + value["slmua"] + '</p>';
                html += '<p class="card-text"> Điện thoại: ' + value["dienthoai"] + '</p>';
                html += '<p class="card-text"> Ngày sinh: ' + value["ngaysinh"] + '</p>';
                html += '<p class="card-text"> Bệnh vào viện: ' + value["benhvaovien"] + '</p>';
                if (hostname == "113.161.8.44") {
                    html += '<a href="http://113.161.8.44:634/UI/NoiTru/KhamBenh/frmNhapChiDinhDSNew.aspx?IDMN=0080050053" target="_blank"><button type="button" class="btn back-page btn-default">Chỉnh Sửa</button></a>';
                } else {
                    html += '<a href="http://172.28.71.30:1234/UI/NoiTru/KhamBenh/frmNhapChiDinhDSNew.aspx?IDMN=0080050053" target="_blank"><button type="button" class="btn back-page btn-default">Chỉnh Sửa</button></a>';
                }
                    html += '</div>';
                    html += '</div>';
                html += '</div>';
                
             
               
            });

            $('#layDSBNtheoGiuong').html(html);
            $('#myTab a[href="#tab3"]').tab('show');
        },
        error: function (error) {
            console.log(error);
            var html = '<div class="col-md-2" title="">lỗi lấy thông tin BN</div>';
            html += '<div class="col-md-8" title="">';
            html += '<input type="text" class="form-control" id="Text1" placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã giường" name="pwd">';
            html += '</div>';
            html += '<div class="col-md-2" title="">';
            html += '<button type="submit" class="btn btn-default">Tìm kiếm</button>';
            html += '<p class="card-text">&nbsp</p>';
            html += '</div>';

            $('#layDSBNtheoGiuong').html(html);
            $('#myTab a[href="#tab3"]').tab('show');
        }
    });
}