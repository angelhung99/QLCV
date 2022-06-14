<%@ Page Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="tableTW.login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="server">
	<header>
	 <div class="overlay"></div>
  <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
    <source src="https://storage.googleapis.com/coverr-main/masters/Midwest-Traffic.mp4" type="video/mp4">
  </video>
    <div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
				<div class="d-flex justify-content-end social_icon">
				<span><a href="https://www.facebook.com/bvtwhue/"><i class="fab fa-facebook-square"></i></a></span>
					<span><a href="http://172.28.71.30:1234/Login2.aspx"><i class="fab fa-chrome"></i></a></span>
					<span><a href="http://192.168.170.15:1894/"><i class="fab fa-internet-explorer"></i></a></span>
				</div>
			</div>
			<div class="card-body">
				<form>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						  <asp:TextBox ID="txtTen"  class="form-control" runat="server"></asp:TextBox>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						 <asp:TextBox ID="txtPass" class="form-control" runat="server" TextMode="Password"></asp:TextBox>
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox">Remember Me
					</div>
					<div class="form-group">
						<asp:Button ID="Submit"  class="btn  login_btn float-right" runat="server" onclick="Submit_Click" Text="Login" />

					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?,Forgot your password?
				</div>
				<div class="d-flex justify-content-center">
					<a href="#">Please call 1552: information technology room </a>
				</div>
			</div>
		</div>
	</div>
</div>
		</header>
</asp:Content>



