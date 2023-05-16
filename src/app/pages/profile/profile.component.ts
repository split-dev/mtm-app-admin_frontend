import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FilesService } from 'src/app/services/files.service';
import { MetafieldsService } from 'src/app/services/metafields.service';
import { Customer, CustomerMetafields } from '../interfaces/customers.interface';
import { suitType } from '../interfaces/products.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  customerId: string | null = '';
  customer: Customer | undefined = undefined;
  defaultMeasurementsObj = {
    lastUpdate: new Date(),
    "chest": 'null',
    "stomach": 'null',
    "hips": 'null',
    "sleeve_length": 'null',
    "back_length": 'null',
    "front_length": 'null',
    "accross_shoulders": 'null',
    "front_shoulder": 'null',
    "nape_to_waist": 'null',
    "front_shoulder_to_waist": 'null',
    "bicep": 'null',
    "cuff": 'null',
    "neck": 'null',
    "waist": 'null',
    "seat": 'null',
    "outleg": 'null',
    "inleg": 'null',
    "thigh": 'null',
    "knee": 'null',
    "front_waist_height": 'null',
    "back_waist_height": 'null',
    "front_rise": 'null',
    "back_rise": 'null'
  };
  metafields: CustomerMetafields = {
    type: 'json',
    namespace: 'custom.additional_info',
    key: "measurements",
    value: {
      additional_info: {
        height: "0",
        fit: "0",
        images: {
          "fullBodyPhotos": [],
          "inspirationImages":[{
              "url": "",
              "description": ""
          }]
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
          }
        });
    }
  }

  updateMetafieldsValue() {
    this.metafieldsService.updateCustomerMetafields(this.metafields).subscribe((res) => {
      console.info('update res', res);
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
    });
  }
}
