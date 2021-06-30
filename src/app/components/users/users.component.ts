import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersList!: User[];

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => 
      {
        console.log(users);
        this.usersList = users;
      });
  }

  edit(id: any): void
  {
    this.router.navigate(['edit_user/'+id]);
  }

  delete(user: User): void
  {
    if(confirm("Êtes-vous sûr ?"))
    {
      this.userService.deleteUser(user).subscribe(users => 
        {
          this.usersList = users;
        });
    }
  }

}
