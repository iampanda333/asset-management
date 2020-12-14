import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from 'src/app/models/assets.model';
import { AssetsService } from 'src/app/service/assets.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assetsList: Asset[] = [];

  constructor(private assetsService: AssetsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.assetsService.getAllAssets().subscribe(
      res => {
        this.assetsList = res;
      }
    );
  }

  onAddRecipe() {
    this.router.navigate(['../edit'], {relativeTo: this.activatedRoute});
  }
}
