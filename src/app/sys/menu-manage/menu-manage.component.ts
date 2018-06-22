import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../toast/toast.service';
import { ModalService } from '../../modal/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../core/http/http.service';
import { SystemConstant } from '../../core/class/system-constant';
import { MenuEditComponent} from '../menu-edit/menu-edit.component';
import { ToastType } from '../../toast/toast-type.enum';
import { ToastConfig } from '../../toast/toast-config';
import { ConfirmConfig } from '../../modal/confirm/confirm-config';
import 'ztree';
import 'jquery';
import {AlertConfig} from '../../modal/alert/alert-config';
import {AlertType} from '../../modal/alert/alert-type';
declare var $: any;

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.scss']
})
export class MenuManageComponent implements OnInit {
  setting = {
    data: {
      simpleData: {
        enable: true,
        pIdKey: 'parentId'
      },
      key: {
        name: 'menuName'
      }
    },
    check: {
      enable: true,
      chkStyle: 'radio',
      radioType: 'all'
    }
  };
  zNodes = [];
  constructor(
    private ngbModal: NgbModal,
    private httpService: HttpService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.openZTree();
  }

  /**
   * 打开部门树
   */
  openZTree() {
    this.httpService.post(SystemConstant.MENU_ZTREE_LIST, {}).subscribe({
      next: (data) => {
        this.zNodes = data;
        $.fn.zTree.init($('#ztree'), this.setting, this.zNodes);
        const treeObj = $.fn.zTree.getZTreeObj('ztree');
        treeObj.expandAll(true);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取菜单失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 添加
   */
  addMenu() {
    let parentId = 0;
    let mgrType = '';
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes !== undefined && nodes !== null) {
      for (let i = 0; i < nodes.length; i++) {
        parentId = nodes[i].id;
        mgrType = nodes[i].mgrType;
      }
    }
    if (mgrType === '2') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '菜单添加', '权限不能添加下级菜单！');
      this.modalService.alert(alertConfig);
      return false;
    }
    const modalRef = this.ngbModal.open(MenuEditComponent);
    modalRef.componentInstance.parentId = parentId;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.openZTree();
        }
      }
    );
  }

  /**
   * 修改
   */
  editMenu() {
    let menuId = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '菜单修改', '必须选择一个菜单！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        menuId = nodes[i].id;
      }
    }
    // 获取菜单数据
    this.httpService.get(SystemConstant.MENU_DETAIL + '/' + menuId).subscribe({
      next: (data) => {
        this.openEditMenu(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取菜单详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改菜单对话框
   */
  openEditMenu(menuData) {
    const modalRef = this.ngbModal.open(MenuEditComponent);
    modalRef.componentInstance.sysMenu = menuData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.openZTree();
        }
      }
    );
  }

  /**
   * 删除
   * @param menuId
   * @param menuName
   */
  delMenu() {
    let menuId = 0;
    let menuName = '';
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '菜单删除', '必须选择一个菜单！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        menuId = nodes[i].id;
        menuName = nodes[i].menuName;
      }
    }
    const confirmCfg = new ConfirmConfig('确定删除菜单：' + menuName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.MENU_DEL + '?id=' + menuId, {}).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除菜单成功！', 3000);
            this.toastService.toast(toastCfg);
            this.openZTree();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除菜单失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

}
