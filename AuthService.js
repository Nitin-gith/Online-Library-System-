class AuthService{
    async setData(data){
        localStorage.setItem('id', data.id);
        localStorage.setItem('email', data.email)
        localStorage.setItem('name', data.name)
        localStorage.setItem('userType', data.userType)
        localStorage.setItem('token', data.token)
        localStorage.setItem('isLogin', true)
    }
}

export default new AuthService