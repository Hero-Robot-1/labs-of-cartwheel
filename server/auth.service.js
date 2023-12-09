class AuthService {
    _userId  = ""
    _userEmail = ""

    getAuthUser() {
        console.log("fetching user auto  : ", this._userId , this._userEmail );
        return {
            id: this._userId,
            email: this._userEmail
        }
    }

    updateUser({id, email}) {
        if(id) this._userId = id
        if(email) this._userEmail = email
        console.log("updating user : ", id , email );
        return this.getAuthUser()
    }
}

export default new AuthService()