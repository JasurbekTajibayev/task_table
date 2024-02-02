<template>
<div class="bg-white mt-4 p-5 shadow">
  <div class="row">
    <div class="col">
      <label for="title"><span class="pi pi-pencil"></span> Title:</label>
      <input for="title" :onchange="getProblems()" v-model="Params.title" type="text" class="form-control shadow" placeholder="" name="email">
    </div>
    <div class="col">
      <label for="title"> <span class="fa fa-tags"></span> Tags:</label>
      <select class="form-select shadow" v-model="Params.tags">
        <option value=""></option>
        <option v-for="tag in tags">
        <option  :value="tag.id">{{tag.name}}</option>
        </option>
      </select>
    </div>
    <div class="col">
      <label for="title"> <span class="fa fa-square-poll-vertical"></span> Difficulty:</label>
      <select  @change="getProblems()" class="form-select shadow" v-model="Params.difficulty">
        <option value=""></option>
        <option v-for="dif in difficulty">
        <option  :value="dif.id">{{dif.name}}</option>
        </option>
      </select>
    </div>
    <div class="col">
      <label for="title"> <span class="pi pi-check-square"></span> Status:</label>
      <select class="form-select shadow" v-model="Params.status">
        <option v-for="item in status">
        <option  :value="item.id">{{item.name}}</option>
        </option>
      </select>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Checker:</label>
      <select class="form-select shadow" v-model="Params.hasChecker">
        <option value=""></option>
        <option v-for="item in hasCheker">
          <option>{{item.name}}</option>
        </option>
      </select>
    </div>
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Checker input:</label>
      <select class="form-select shadow" v-model="Params.hasCheckInput">
        <option value=""></option>
        <option v-for="item in hasCheker">
          <option>{{item.name}}</option>
        </option>
      </select>
    </div>
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Solution: </label>
      <select class="form-select shadow" v-model="Params.hasSolution">
        <option value=""></option>
        <option v-for="item in hasCheker">
          <option>{{item.name}}</option>
        </option>
      </select>
    </div>
    <div class="col">
      <label for="checker"><span class="pi pi-filter"></span> Partial Solvable:</label>
      <select class="form-select shadow" v-model="Params.partialSolvable">
        <option value=""></option>
        <option v-for="item in hasCheker">
          <option>{{item.name}}</option>
        </option>
      </select>
    </div>
    
  </div>
</div>  
</template>
<script>
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
        },
    problems: [],
    tags: api.methods.getTags().then((value)=>{this.tags=value;}, (error)=>{ this.tags=[]; }),
    difficulty: api.methods.getDiff().then((value)=>{this.difficulty=value}, (error)=>{this.difficulty=[]}),
    status: [{id: 3, name: 'Unknown'}, {id:1, name: 'Solved'}, {id:2, name: 'Unsolved'}],
    hasCheker: [{value: true, name: 'Yes'}, {value: false, name: 'No'}],
    loading: true,
      
    }
  },
  methods: {
    getProblems() {
    //   this.loading=true;
    //   this.problems=api.methods.getProblems(this.Params).then((value)=>  {this.problems=value; this.loading=false;} );
    
    }
  },
  mounted() {
  }
}
</script>
<style>
    
</style>