import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FilesService } from 'src/app/services/files.service';
import { MetafieldsService } from 'src/app/services/metafields.service';
import { Customer, CustomerMetafields } from '../interfaces/customers.interface';
import { suitType } from '../interfaces/products.interface';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private debounceSubject = new Subject<string>();
  private debounceText = new Subject<string>();
  customerId: string | null = '';
  customer: Customer | undefined = undefined;
  defaultMeasurementsObj = {
    lastUpdate: new Date(),
    "chest": '0',
    "stomach": '0',
    "hips": '0',
    "sleeve_length": '0',
    "back_length": '0',
    "front_length": '0',
    "accross_shoulders": '0',
    "front_shoulder": '0',
    "nape_to_waist": '0',
    "front_shoulder_to_waist": '0',
    "bicep": '0',
    "cuff": '0',
    "neck": '0',
    "waist": '0',
    "seat": '0',
    "outleg": '0',
    "inleg": '0',
    "thigh": '0',
    "knee": '0',
    "front_waist_height": '0',
    "back_waist_height": '0',
    "front_rise": '0',
    "back_rise": '0'
  };
  metafields: CustomerMetafields = {
    type: 'json',
    namespace: 'custom.additional_info',
    key: "measurements",
    value: {
      additional_info: {
        height: '0',
        fit: '0',
        images: {
          "fullBodyPhotos": [],
          "inspirationImages":[]
        }
      },
      body_measurements: {...this.defaultMeasurementsObj},
      final_garment: {...this.defaultMeasurementsObj}
    },
    owner_resource: "customers",
    owner_id: ""
  };
  measurementKeys: string[] = Object.keys(this.defaultMeasurementsObj).filter(k => k !== 'lastUpdate');
  productSuitTypes: suitType[] = ['blazer', '2-piece suit', '3-piece suit', '2-trouser suit', '2-piece formal', '3-piece formal', 'overcoat', 'trouser'];
  editingImageId: number | null = null;
  photoId: number | null = null;

  constructor(
    private metafieldsService: MetafieldsService, 
    private customerService: CustomersService, 
    private filesService: FilesService, 
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId) {
      this.customerService.getCustomer(this.customerId)
        .subscribe((res) => {
          this.customer = res.data;
        });

        this.metafieldsService.getCustomerMetafields(this.customerId).subscribe((res) => {
          this.metafields = (res.data && res.data.id) ? res.data : this.metafields;
          this.metafields.owner_id = this.customerId;

          console.log('get res', res.data);
          
          if (!res.data.id) {
            this.metafieldsService.createCustomerMetafields(this.metafields).subscribe((res) => {
              console.log('create res', res);
              this.metafields.id = res.data.id;
            });
          } else {
            Object.keys(this.metafields.value.body_measurements).forEach((key) => {
              if (this.metafields.value.body_measurements[key][0] && typeof this.metafields.value.body_measurements[key] === 'object') {
                  this.metafields.value.body_measurements[key] = this.metafields.value.body_measurements[key].shift()
              }
            });
            Object.keys(this.metafields.value.final_garment).forEach((key) => {
              if (this.metafields.value.final_garment[key][0] && typeof this.metafields.value.final_garment[key] === 'object') {
                  this.metafields.value.final_garment[key] = this.metafields.value.final_garment[key].shift()
              }
            });
          }
        });
    }

    this.debounceSubject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.updateMetafieldsValue();
    });
    this.debounceText.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.updateCustomer();
    });
  }

  ngOnDestroy() {
    this.debounceSubject.unsubscribe();
    this.debounceText.unsubscribe();
  }

  updateMetafield(ev: any, group: any, value: any) {
    this.metafields.value[group][value] = ev;
    this.debounceSubject.next(ev);
  }

  updateNote(ev: any) {
    if (!this.customer) return;
    this.customer.note = ev;
    this.debounceText.next(ev);
  }

  updateMetafieldsValue() {
    this.metafieldsService.updateCustomerMetafields(this.metafields).subscribe((res) => {
      console.info('update res', res);
    });
  }

  updateCustomer() {
    if (!(this.customerId && this.customer)) return;

    this.customerService.setCustomer(this.customerId, this.customer).subscribe((res) => {
      console.info('update customer', res);
    });
  }

  selectedBodyPhotos(event: any) {
    const files = event.target.files;    
    const formdata = new FormData();

    if (files && files.length > 0) {
      const file = files[0];

      formdata.append('file', file, file.name);
    }

    console.log('formdata', formdata.getAll('file'));

    this.filesService.uploadImage(formdata).subscribe(res => {
      console.log('upload res', res);
      if (res.data?.url?.length) {
        this.metafields.value.additional_info['images'].fullBodyPhotos.push({
          id: +res.data.shortId,
          url: res.data.url
        });
        this.updateMetafieldsValue();
      }
    });
  }

  selectedInspirationPhoto(event: any) {
    const files = event.target.files;    
    const formdata = new FormData();

    if (files && files.length > 0) {
      const file = files[0];

      formdata.append('file', file, file.name);
    }

    console.log('formdata', formdata.getAll('file'));

    this.filesService.uploadImage(formdata).subscribe(res => {
      console.log('upload res', res);
      if (res.data?.url?.length) {
        this.metafields.value.additional_info['images'].inspirationImages.push({
          id: +res.data.shortId,
          url: res.data.url,
          description: ''
        });
        this.updateMetafieldsValue();
      }
    });
  }

  setEditingPhoto(i: number) {
    this.editingImageId = i;
  }
  setOpenBodyPhoto(i: number) {
    this.photoId = i;
  }

  updateImageDescription(ev: any, id: number) {
    this.metafields.value.additional_info['images'].inspirationImages[id].description = ev.target.value;
    this.updateMetafieldsValue();
  }

  deleteImage(id: number, group: string) {
    this.filesService.deleteImage(id).subscribe(res => {
      console.log('delete res', res);
      this.metafields.value.additional_info['images'][group] = this.metafields.value.additional_info['images'][group].filter((img: any) => img.id !== id);

      this.updateMetafieldsValue();
    });
  }
}
