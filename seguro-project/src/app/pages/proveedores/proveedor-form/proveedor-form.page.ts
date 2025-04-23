import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../interfaces/proveedor.interface';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.page.html',
  styleUrls: ['./proveedor-form.page.scss'],
})
export class ProveedorFormPage implements OnInit {
  proveedorForm: FormGroup;
  isEdit = false;
  proveedorId?: number;

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.proveedorForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.proveedorId = +id;
      this.loadProveedor(this.proveedorId);
    }
  }

  async loadProveedor(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.proveedoresService.getProveedor(id).subscribe(
      (proveedor) => {
        this.proveedorForm.patchValue(proveedor);
        loading.dismiss();
      },
      async (error) => {
        console.error('Error loading proveedor:', error);
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Error al cargar el proveedor',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }

  async onSubmit() {
    if (this.proveedorForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Guardando...',
      });
      await loading.present();

      const proveedor: Proveedor = this.proveedorForm.value;

      const action = this.isEdit
        ? this.proveedoresService.updateProveedor(this.proveedorId!, proveedor)
        : this.proveedoresService.createProveedor(proveedor);

      action.subscribe(
        async () => {
          loading.dismiss();
          const toast = await this.toastController.create({
            message: `Proveedor ${this.isEdit ? 'actualizado' : 'creado'} exitosamente`,
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.router.navigate(['/proveedores']);
        },
        async (error) => {
          console.error('Error saving proveedor:', error);
          loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error al guardar el proveedor',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    }
  }
}
