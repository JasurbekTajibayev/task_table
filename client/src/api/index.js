import axios from "axios";
export default {
    name :'myapi',
    
    data() {
        return {
            problems: [],
            tags: [],
            difficulty: [],
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
        }
    },
  
    methods: {
        async getTags() {
            const url="https://kep.uz/api/tags";
            try {
                const data = await axios.get(url);
                this.tags=data.data;
            } catch (error) {
                console.log(error);
            } finally {
                return this.tags;
            }
        },
        async getDiff() {
            const url="https://kep.uz/api/problems/difficulties";
            try {
                const data = await axios.get(url);
                this.difficulty=data.data;
            } catch (error) {
                console.log(error);
            } finally {
                return this.difficulty;
            }
        },
        async getProblems(Params=this.Params) {
            const url="https://kep.uz/api/problems";
            try {
                const {data} = await axios.get(url,{
                    params: {
                        ordering: 'id',
                        title: Params.title,

                    }
                });
                this.problems=data.data;
            } catch (error) {
                console.log(error);
            } finally {
                return this.problems;
            }
        },
    },
}
