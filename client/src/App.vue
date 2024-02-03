<template>
  <div class="container">
  <header>
    <div class="bg-dark mt-1 p-4 text-white text-center shadow">kep.uz problems table</div>
    <div class="bg-white p-5 shadow">
  <div class="row">
    <div class="col">
      <label for="title"><span class="pi pi-pencil"></span> Title:</label>
      <input for="title" @change="getProblems()" v-model="Params.title" type="text" class="form-control shadow" placeholder="" name="email">
    </div>
    <div class="col">
      <label for="title"> <span class="fa fa-tags"></span> Tags:</label>
      <select class="form-select shadow" @change="getProblems()" v-model="Params.tags">
        <option value=""></option>
        <option v-for="tag in tags" :value="tag.id">{{tag.name}}</option>
      </select>
    </div>
    <div class="col">
      <label for="title"> <span class="fa fa-square-poll-vertical"></span> Difficulty:</label>
      <select  @change="getProblems()" class="form-select shadow" v-model="Params.difficulty">
        <option value=""></option>
        <option v-for="dif in difficulty" :value="dif.value">{{dif.name}}</option>
      </select>
    </div>
    <div class="col">
      <label for="title"> <span class="pi pi-check-square"></span> Status:</label>
      <select class="form-select shadow" @change="getProblems()" v-model="Params.status">
        <option v-for="item in status"  :value="item.id">{{item.name}}</option>
      </select>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Checker:</label>
      <select class="form-select shadow" @change="getProblems()" v-model="Params.hasChecker">
        <option value=""></option>
          <option v-for="item in hasCheker" :value="item.value">{{item.name}}</option>
      </select>
    </div>
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Checker input:</label>
      <select class="form-select shadow" @change="getProblems()" v-model="Params.hasCheckInput">
        <option value=""></option>
        <option v-for="item in hasCheker" :value="item.value">{{item.name}}</option>
      </select>
    </div>
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Solution: </label>
      <select class="form-select shadow" @change="getProblems()" v-model="Params.hasSolution">
        <option value=""></option>
        <option v-for="item in hasCheker" :value="item.value">{{item.name}}</option>
      </select>
    </div>
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Partial Solvable:</label>
      <select class="form-select shadow" @change="getProblems()" v-model="Params.partialSolvable">
        <option value=""></option>
        <option v-for="item in hasCheker" :value="item.value">{{item.name}}</option>
      </select>
    </div>
    
  </div>
</div>  
  </header>

  <main class="mt-3 shadow">
    <table class="table table-hover">
    <thead>
      <tr>
        <th @click="fetchOrder('id')" >ID<span v-if="Params.order.name=='id' || Params.order.name=='-id'" :class="Params.order.icon"></span><span v-else="" class="pi pi-sort-alt"></span></th>
        <th @click="fetchOrder('title')"> <span class="pi pi-align-center"></span> Title <span v-if="Params.order.name=='title' || Params.order.name=='-title'" :class="Params.order.icon"></span><span v-else="" class="pi pi-sort-alt"></span></th>
        <th><span class="pi pi-sitemap"></span> Tags </th>
        <th @click="fetchOrder('difficulty')"><span class="fa-solid fa-bars-staggered"></span> Difficulty<span v-if="Params.order.name=='difficulty' || Params.order.name=='-difficulty'" :class="Params.order.icon"></span><span v-else="" class="pi pi-sort-alt"></span></th>
        <th @click="fetchOrder('rating')"><span class="fa-solid fa-award"></span> Rating <span v-if="Params.order.name=='rating' || Params.order.name=='-rating'" :class="Params.order.icon"></span><span v-else="" class="pi pi-sort-alt"></span></th>
        <th @click="fetchOrder('solved')"><span class="pi pi-check-square"></span> Attempts <span v-if="Params.order.name=='solved' || Params.order.name=='-solved'" :class="Params.order.icon"></span><span v-else="" class="pi pi-sort-alt"></span></th>
      </tr>
    </thead>
    <tbody>
      
      <tr v-if="!loading" v-for="problem in problems">
        <td>{{problem.id}}</td>
        <td> <div style="display: block;"><a class="page-link" :href="'https://kep.uz/practice/problems/problem/'+problem.id" :title="problem.title">{{problem.title}}</a></div>
          <span class="badge bg-success" v-show="problem.hasSolution"> <span class="pi pi-check-circle"></span> Solution</span>
        </td>
        <td>
          <span class="badge bg-primary" v-for="item in problem.tags" :title="item.name">{{item.name}}</span>
        </td>
        <td> <span :class="getSeveriry(problem.difficulty)" :title="problem.difficultyTitle" class="shadow" style="width: 6rem;">{{problem.difficultyTitle}}</span></td>
        <td> <span class="pi pi-thumbs-up"></span>{{problem.likesCount}} <span class="pi pi-thumbs-down"></span>{{problem.dislikesCount}}  </td>
        <td> <span class="badge bg-info" style="width: 6rem;"><i class="pi pi-check"></i> {{problem.solved+"/"+problem.attemptsCount}}</span> </td>
      </tr>
    </tbody>
  </table>
  <div v-if="loading" class="mt-4 p-5 bg-light d-flex justify-content-center">
        <i class="spinner-border text-muted"></i>
      </div>
  <div class="p-3">
  <ul class="pagination justify-content-center">
  <li class="page-item" title="Begin"  @click="goPage(1)"><a class="page-link" href="#"><span class="pi pi-angle-double-left"></span></a></li>
  <li class="page-item" title="Previous" @click="goPage(Params.page-1)" v-if="Params.page!=1"><a class="page-link" href="#"><span class="fa fa-angle-left"></span></a></li>
  <!-- <li v-for="item in (pages_count>5?5:pages_count)" class="page-item" :class="item==Params.page?'active':''" @click="goPage(item)" ><a class="page-link" href="#">{{item}}</a></li> -->
  <li v-for="item in (Params.page-1>2?2:Params.page-1)" class="page-item" @click="goPage(Params.page+item-(Params.page==2?2:3))" :title="Params.page+item-(Params.page==2?2:3)"><a class="page-link" href="#">{{Params.page+item-(Params.page==2?2:3)}}</a></li>
  <li class="page-item active" title="Current"><a class="page-link" href="#">{{Params.page}}</a></li>
  <li v-for="item in (pages_count-Params.page)>=2?2:(pages_count-Params.page)" class="page-item" @click="goPage(Params.page+item)" :title="Params.page+item" ><a class="page-link" href="#">{{Params.page+item}}</a></li>
  <li class="page-item" title="Next" @click="goPage(Params.page+1)" v-if="Params.page!=pages_count"><a class="page-link" href="#"><span class="fa fa-angle-right"></span></a></li>
  <li class="page-item" title="End" @click="goPage(pages_count)"><a class="page-link" href="#"><span class="pi pi-angle-double-right"></span></a></li>

  <select class="form-select" style="width: 5rem; margin-left: 4rem;" v-model="Params.page_size" @change="getProblems(), goPage(1)">
    <option value="10">10</option>
    <option value="20" selected>20</option>
    <option value="30">30</option>
    <option value="50">50</option>
  </select>
</ul> 
  
</div>
</main>
  <footer class="p-4 mb-1 bg-dark text-white text-center shadow">
    Created By: JASURBEK TAJIBAYEV
  </footer>
  </div>
  
</template>

<script>
import axios from 'axios';
import api from '@/api/index';
export default {
  data() {
    return {
      Params: {
            title: null,
            tags: [],
            difficulty: null,
            status: null,
            hasChecker: null,
            hasCheckInput: null,
            hasSolution: null,
            partialSolvable: null,
            order: {id: 0, icon: "pi pi-sort-alt", name: "" },
            page: 1,
            page_size: 20,
        },
      count: null,
      total: null,
      pages_count: 1,
      problems: [],
      tags: api.methods.getTags().then((value)=>{this.tags=value;}, (error)=>{ this.tags=[]; }),
      difficulty: api.methods.getDiff().then((value)=>{this.difficulty=value}, (error)=>{this.difficulty=[]}),
      status: [{id: 3, name: 'Unknown'}, {id:1, name: 'Solved'}, {id:2, name: 'Unsolved'}],
      hasCheker: [{value: true, name: 'Yes'}, {value: false, name: 'No'}],
      loading: true,
    }
  },
  methods: {
   async getProblems() {
      this.loading=true;
      const url="https://kep.uz/api/problems";
      try {
        const {data} = await axios.get(url,{
                    params: {
                        ordering: this.Params.order.name,
                        title: this.Params.title,
                        tags: this.Params.tags,
                        difficulty: this.Params.difficulty,
                        status: this.Params.status,
                        has_checker: this.Params.hasChecker,
                        has_check_input: this.Params.hasCheckInput,
                        has_solution: this.Params.hasSolution,
                        partial_solvable: this.Params.partialSolvable,
                        page_size: this.Params.page_size,
                        page: this.Params.page,
                    }
                });
                this.problems=data.data;
                this.total=data.total;
                this.pages_count=data.pagesCount;
                

      } catch (error) {
        console.log(error)
      } finally {
        this.loading=false;
      }
    },
    getSeveriry(x) {
      switch(x) {
        case 1: return "badge bg-success";
        case 2: return "badge bg-info";
        case 3: return "badge bg-secondary";
        case 4: return "badge bg-primary";
        case 5: return "badge bg-warning";
        case 6: return "badge bg-danger";
        case 7: return "badge bg-dark";        
        default: ""
      }
    },
    fetchOrder(name) {
      this.Params.order.id=this.Params.order.id+1;
      if(this.Params.order.id==3) {
        this.Params.order.id=0;  
      } 
      switch(this.Params.order.id) {
        case 0: { this.Params.order.icon="pi pi-sort-alt"; this.Params.order.name=""; } break;
        case 1: { this.Params.order.icon="pi pi-sort-amount-up-alt"; this.Params.order.name=name; } break;
        case 2: { this.Params.order.icon="pi pi-sort-amount-down"; this.Params.order.name="-"+name; } break;
        default: {}
      }
      this.getProblems();
    },
    goPage(page) {
      this.Params.page=page;
      this.getProblems();
    }
    
  },
  mounted() {
    this.getProblems();
  }

}
</script>

<style>
</style>
