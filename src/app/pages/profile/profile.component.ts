import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FilesService } from 'src/app/services/files.service';
import { MetafieldsService } from 'src/app/services/metafields.service';
import { Customer, CustomerMetafields } from '../interfaces/customers.interface';
import { suitType } from '../interfaces/products.interface';
import { debounceTime } from 'rxjs/operators';
import { throwError, Observable, Subject, of, timer } from 'rxjs';
import { catchError, takeWhile, delay, retry, concatMap } from 'rxjs/operators';
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
  IMG_WAIT_DELAY: number = 1000;
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
  defaultFinalGarmentObj:any = {
    mens_pant:{
      waist: '0',
      thigh: '0',
      u_rise: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      outseam_l:'0',
      outseam_r:'0',
      knee: '0',
      pant_bottom: '0',
      calf_girth: '0',
      adjustments:{
        seat:'0',
        waist_height:'0',
        front_rise:'0',
        zipper_length:'0',
        front_thigh:'0',
        notes:'0'
      }
    },
    mens_jacket:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    mens_overcoat:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    mens_shirt:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    mens_vest:{
      vest_back_length: '0',
      neck: '0',
      chest: '0',
      stomach: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      front_waist_length: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
  };
  valueBodyMeasurements:any = {
    "chest": '0',
    "stomach": '0',
    "back_length": '0',
    "front_waist_length": '0',
    "nape_to_waist": '0',
    "bicep": '0',
    "shoulder": '0',
    "sleeve": '0',
    "font_shoulder": '0',
    "wrist_circumference":'0',
    "pant_bottom":'0',
    "calf_girth":'0',
    "u_rise": '0',
    "neck": '0',
    "waist": '0',
    "seat": '0',
    "outleg": '0',
    "inleg": '0',
    "thigh": '0',
    "knee": '0',
    "front_waist_height": '0',
    "back_waist_height": '0',
    "posture":{
      "slope_shoulder_left":'0',
      "slope_shoulder_right":'0',
      "shoulder_blade":'0',
      "back_style":'0',
      "chest":'0',
      "stomach":'0',
      "arm":'0',
      "soulders":'0',
    }
  }
  valueFinalGarmentObj:any = {
    mens_pant:{
      waist: '0',
      thigh: '0',
      u_rise: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      outseam_l:'0',
      outseam_r:'0',
      knee: '0',
      pant_bottom: '0',
      calf_girth: '0',
      adjustments:{
        seat:'0',
        waist_height:'0',
        front_rise:'0',
        zipper_length:'0',
        front_thigh:'0',
      }
    },
    mens_jacket:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
      }
    },
    mens_overcoat:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
      }
    },
    mens_shirt:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
      }
    },
    mens_vest:{
      vest_back_length: '0',
      neck: '0',
      chest: '0',
      stomach: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      front_waist_length: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
      }
    },
  };
  bodyMeasurementsKeys: string[] = Object.keys(this.valueBodyMeasurements).filter(k => k !== 'posture');
  bodyMeasurementsPostureKeys: string[] = Object.keys(this.valueBodyMeasurements.posture);
  measurementKeysAll:any ={
    'mens_pant':Object.keys(this.defaultFinalGarmentObj.mens_pant).filter(k => k !== 'adjustments'),
    'mens_jacket':Object.keys(this.defaultFinalGarmentObj.mens_jacket).filter(k => k !== 'adjustments'),
    'mens_overcoat':Object.keys(this.defaultFinalGarmentObj.mens_overcoat).filter(k => k !== 'adjustments'),
    'mens_shirt':Object.keys(this.defaultFinalGarmentObj.mens_shirt).filter(k => k !== 'adjustments'),
    'mens_vest':Object.keys(this.defaultFinalGarmentObj.mens_vest).filter(k => k !== 'adjustments'),
  }
  measurementPlaceholderAll:any ={
    'mens_pant':{
      "waist": '58-190 cm',
      "thigh": '39-113 cm',
      "u_rise": '50-120 cm',
      "front_waist_height": '0-21 cm',
      "back_waist_height": '0-30 cm',
       outseam_l:'37-135 cm',
       outseam_r:'37-135 cm',
      "knee": '30-103 cm',
      "pant_bottom": '28-80 cm',
      "calf_girth": '25-70 cm',
    },
    'mens_jacket':{
      neck: '30-66 cm',
      chest: '66-190 cm',
      stomach: '58-185 cm',
      front_waist_length: '31-75 cm',
      sleeve_l:'30-85 cm',
      sleeve_r:'30-85 cm',
      seat: '68-200 cm',
      bicep: '19-68 cm',
      shoulder: '31-72 cm',
      front_shoulder: '29-68 cm',
      nape_to_waist : '29-63 cm',
      back_length: '47-105 cm',
    },
    'mens_overcoat':{
      neck: '30-66 cm',
      chest: '66-190 cm',
      stomach: '58-185 cm',
      front_waist_length: '31-75 cm',
      sleeve_l:'30-85 cm',
      sleeve_r:'30-85 cm',
      seat: '68-200 cm',
      bicep: '19-68 cm',
      shoulder: '31-72 cm',
      front_shoulder: '29-68 cm',
      nape_to_waist : '29-63 cm',
      back_length: '47-105 cm',
    },
    'mens_shirt':{
      neck: '30-66 cm',
      chest: '66-190 cm',
      stomach: '58-185 cm',
      front_waist_length: '31-75 cm',
      sleeve_l:'30-85 cm',
      sleeve_r:'30-85 cm',
      seat: '68-200 cm',
      bicep: '19-68 cm',
      shoulder: '31-72 cm',
      front_shoulder: '29-68 cm',
      nape_to_waist : '29-63 cm',
      back_length: '47-105 cm',
    },
    'mens_vest':{
      vest_back_length: '40-78 cm',
      neck: '30-62 cm',
      chest: '72-190 cm',
      stomach: '55-185 cm',
      shoulder: '38-70 cm',
      front_shoulder: '36-68 cm',
      nape_to_waist : '35-60 cm',
      front_waist_length: '37-60 cm',
      front_waist_height: '0-17 cm',
      back_waist_height: '0-30 cm',
    }
  }
  garmentTypes: any[] = ['mens_pant', 'mens_jacket','mens_overcoat','mens_shirt','mens_vest'];
  radioButtonCustom:any ={
    'seat':['Standard', 'Flat Seat', 'Prominent Seat', 'Drop Seat'],
    'waist_height':['Standard', 'Higher 3cm', 'Higher 2cm', 'Higher 1cm','Lower 1cm','Lower 2cm','Lower 3cm','Lower 4cm','Lower 5cm','Lower 6cm'],
    'front_rise':['Standard', 'Reduce 1cm', 'Reduce 2cm'],
    'zipper_length':['Standard', 'Add 1cm', 'Add 2cm'],
    'front_thigh':['Standard', 'Add dart', 'Add 2 darts'],
    'slope_shoulder_left':['Standard','Slight Slope','Moderate Slope','Very Slope','Slight High','Half High','High'],
    'slope_shoulder_right':['Standard','Slight Slope','Moderate Slope','Very Slope','Slight High','Half High','High'],
    'shoulder_blade':['Protruding shoulder blade','Protruding top shoulder blade'],
    'back_style':['Standard','Slight Concave','Very Concave'],
    'chest':['Standard','Single Dart','Double Dart'],
    'stomach':['Standard','Portly','Normal belly'],
    'arm':['Standard','Very Back','Slightly Back','Forward','Very Forward'],
    'soulders':['Standard','Very Back','Slightly Back','Forward','Very Forward'],
    'fit':['Extremely Slim', 'Very Slim', 'Slim', 'Regular Tight', 'Regular', 'Regular Loose', 'Loose', 'Very Loose', 'Extremely Loose'],
    'half_back_to_stomach':['Standard', 'Add 0.5cm', 'Add 1cm', 'Add 1.5cm', 'Reduce 0.5cm', 'Reduce 1cm', 'Reduce 1.5cm'],
    'half_back_to_bottom':['Standard', 'Add 0.5cm', 'Add 1cm', 'Add 1.5cm', 'Reduce 0.5cm', 'Reduce 1cm', 'Reduce 1.5cm'],
    'shoulder_pad':['Standard', 'No Pad (Wadding)', 'Pad 1cm', 'Pad 1.2cm', 'Pad 1.5cm'],
    'back_pad':['Add Back Pad 0.5cm', 'Add Back Pad 1cm', 'Add Back Pad 1.5cm'],
    'armhole':['Standard', 'Lower 0.5cm', 'Lower 1cm', 'Lower 1.5cm'],
    'lower_back_collar':['Standard', 'Lower 0.6cm', 'Lower 1cm', 'Lower 1.5cm', 'Lower 2cm'],
    'nape_to_waist':['Standard', 'Decrease 0.8cm', 'Decrease 1.2cm', 'Decrease 2cm', 'Increase 0.8cm', 'Increase 1.2cm', 'Increase 2cm'],
  }

  metafields:CustomerMetafields = {
    type: 'json',
    namespace: 'custom.additional_info',
    key: "measurements",
    value: {
      additional_info: {
        gender: 'Other',
        height: '0',
        weight: '0',
        age:0,
        fit: 'Extremely Slim',
        images: {
          "fullBodyPhotos": [],
          "inspirationImages":[]
        }
      },
      body_measurements: {...this.valueBodyMeasurements},
      final_garment: {...this.valueFinalGarmentObj}
    },
    owner_resource: "customers",
    owner_id: ""
  };

  measurementKeys: string[] = Object.keys(this.defaultMeasurementsObj).filter(k => k !== 'lastUpdate');
  productSuitTypes: suitType[] = ['blazer', '2-piece suit', '3-piece suit', '2-trouser suit', '2-piece formal', '3-piece formal', 'overcoat', 'trouser'];
  editingImageId: number | null = null;
  photoId: number | null = null;
  lastUpdatedBodyMeasurements$: string | undefined;
  lastUpdatedFinalGarment$: string | undefined;
  isEditMode: boolean = false;
  hasUnsavedChanges: boolean = false;
  constructor(
    private metafieldsService: MetafieldsService,
    private customerService: CustomersService,
    private filesService: FilesService,
    private route: ActivatedRoute,
  ) {}

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
          this.metafields.value['body_measurements']['breast_highest_point']='0';
          this.metafieldsService.createCustomerMetafields(this.metafields).subscribe((res) => {
            console.log('create res', res);
            this.metafields.id = res.data.id;
          });
        } else {
         /* Object.keys(this.metafields.value.body_measurements).forEach((key) => {
            if (this.metafields.value.body_measurements[key][0] && typeof this.metafields.value.body_measurements[key] === 'object') {
              console.log(this.metafields.value.body_measurements[key][0])
                this.metafields.value.body_measurements[key] = this.metafields.value.body_measurements[key].shift()
            }
          });
          Object.keys(this.metafields.value.final_garment).forEach((key) => {
            if (this.metafields.value.final_garment[key][0] && typeof this.metafields.value.final_garment[key] === 'object') {
                this.metafields.value.final_garment[key] = this.metafields.value.final_garment[key].shift()
            }
          });*/
        }
        if(this.metafields.value.additional_info['gender']==='Female' || this.metafields.value.additional_info['gender']==='Other' ){
          this.bodyMeasurementsKeys.push('breast_highest_point')
        }
        console.log(this.metafields)
        this.lastUpdatedBodyMeasurements$ = this.metafields.value.body_measurements['lastUpdate'];
        this.lastUpdatedFinalGarment$ = this.metafields.value.final_garment['lastUpdate'];
      });
    }
    console.log(this.metafields)

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

  enterEditMode(): void {
    this.isEditMode = true;
  }

  saveChanges(): void {
    this.isEditMode = false;
    this.debounceSubject.next('test');
  }

  updateAdditionalInfoMetafield(ev: any, value: any) {
    if(value!=='age'){
      const val = ev.length > 0 ? ev : '0';
      this.metafields.value['additional_info'][value] = val;
    }else {
      const val = ev.length > 0 ? ev : '0';
      this.metafields.value['additional_info'][value] = +val;
    }
  }
  updateBodyMeasurementsMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value[group][value] = val;
  }
  updateBodyMeasurementsPostureMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value[group]['posture'][value] = val;
  }
  updateFinalGarmentMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value.final_garment[group][value] = val;
  }
  updateFinalGarmentAdjustmentsMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value.final_garment[group]['adjustments'][value] = val;
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

    this.filesService.uploadImage(formdata).pipe(
      concatMap((res) => {
        if (res.data?.url?.length) {
          return timer(this.IMG_WAIT_DELAY).pipe(
            concatMap(() => this.filesService.checkImageAvailability(res.data.url, res.data.shortId))
          );
        } else {
          return of(null);
        }
      }),
      takeWhile((response: any) => {console.log(response);return response !== null && response.status !== 200}, true),
      catchError((error) => {
        console.log('Error:', error);

        return throwError(error);
      })
    ).subscribe((response) => {
      if (response && response.status === 200) {
        this.metafields.value.additional_info['images'].fullBodyPhotos.push({
          id: +response.id,
          url: response.data.url
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

  testF(garment: string):string[] {
    if (this.defaultFinalGarmentObj[garment]?.adjustments) {
      return Object.keys(this.defaultFinalGarmentObj[garment].adjustments);
    }

    return []
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
