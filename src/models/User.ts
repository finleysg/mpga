export class User {

    id: number = 0;
    username: string = "";
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    isAuthenticated = false;
    isStaff = false;
    isActive = false;
    groups: string[] = [];

    static Guest = () => {
        const guest = new User();
        guest.isAuthenticated = false;
        return guest
    }

    get isClubEditor(): boolean {
        return this.isAuthenticated && this.groups.indexOf("Editor") >= 0;
    }

    get isFullEditor(): boolean {
        return this.isAuthenticated && this.isStaff && this.groups.indexOf("Editor") >= 0;
    }
    
    get name(): string {
        if (!this.isAuthenticated) {
            return "Guest";
        }
        return this.firstName + " " + this.lastName;
    }

    fromJson(json: any): User {
        if (json) {
            this.id = json.id;
            this.username = json.username;
            this.firstName = json.first_name;
            this.lastName = json.last_name;
            this.email = json.email;
            this.isAuthenticated = json.is_authenticated;
            this.isStaff = json.is_staff;
            this.isActive = json.is_active;
            this.groups = json.groups && json.groups.map((g: any) => g.name);
        }
        return this;
    }

    prepJson(): any {
        return {
            "id": this.id,
            "username": this.username,
            "first_name": this.firstName,
            "last_name": this.lastName,
            "email": this.email,
        };
    }
}

export class PasswordResetRequest {
    uid: string = "";
    token: string = "";
    password1: string = "";
    password2: string = "";

    constructor(uid: string, token: string, password1: string, password2: string) {
        const reset = {
            uid: uid,
            token: token,
            password1: password1,
            password2: password2,
        }
        Object.assign(this, reset);
    }
    
    get isValid(): boolean {
        return this.uid !== "" && this.token !== "" && this.password1 !== "" && this.password1 === this.password2;
    }

    get matching(): boolean {
        return this.password1 !== "" && this.password1 === this.password2;
    }

    toJson(): any {
        return {
            "uid": this.uid,
            "token": this.token,
            "new_password": this.password1,
            "re_new_password": this.password2
        };
    }
}

