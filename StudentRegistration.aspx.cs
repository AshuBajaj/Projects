using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class StudentRegistration : System.Web.UI.Page
{
    //connection string for connecting with remote database

    SqlConnection con = new SqlConnection(@"Data Source=rm-6gjt0i37hchv8r98ono.mssql.ap-south-1.rds.aliyuncs.com,3433;Initial Catalog=mydb;User ID=testuser;Password=Testuser1234");

    protected void Page_Load(object sender, EventArgs e)
    {
       
    }
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        try
        {
            //connection open
            con.Open();
            //inserting value in student database
            SqlCommand cmd = new SqlCommand("INSERT into student values('" + txtId.Text.ToString() + "','" + txtName.Text.ToString() + "','" + txtCourse.Text.ToString() + "','" + txtAddress.Text.ToString() + "','" + txtEmail.Text.ToString() + "','" + txtPhone.Text.ToString() + "')", con);
            int numberRows = cmd.ExecuteNonQuery();
            
            con.Close();
            
            txtId.Text = "";
            txtName.Text = "";
            txtCourse.Text = "";
            txtAddress.Text = "";
            txtEmail.Text = "";
            txtPhone.Text = "";
            clearRecord();

            Response.Redirect("record.aspx");
        }
        catch (Exception ex)
        {
            label1.Text = ex.Message;
            label1.Visible = true;

        }
    }
    // clear function
    public void clearRecord()
    {
        txtId.Text = "";
        txtName.Text = "";
        txtCourse.Text = "";
        txtEmail.Text = "";
        txtAddress.Text = "";
        txtPhone.Text = "";

    }
}