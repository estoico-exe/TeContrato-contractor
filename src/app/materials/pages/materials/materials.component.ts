import {Component, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../../services/material.service";
import {Material} from "../../model/material";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import * as _ from 'lodash';
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  materialData: Material;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'amount', 'cost', 'age'];

  @ViewChild('materialForm', {static: false})
  materialForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private materialService: MaterialService) {
    this.materialData = {} as Material;
    this.dataSource = new MatTableDataSource<any>();
  }


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllMaterials();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllMaterials() {
    this.materialService.getAll().subscribe((response:any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Material) {
    this.materialData = _.cloneDeep(element);
    this.isEditMode = true;
  }


  cancelEdit() {
    this.isEditMode = false;
    this.materialForm.resetForm();
  }

  deleteItem(id: number) {
    this.materialService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Material) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addMaterial() {
    this.materialService.create(this.materialData).subscribe( (response:any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; })
    });
  }
  updateMaterial() {
    this.materialService.update(this.materialData.id, this.materialData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Material) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
    if (this.materialForm.valid) {
      if (this.isEditMode) {
        this.updateMaterial();
      } else {
        this.addMaterial();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}
