app.controller('TodosCtrl', function($scope, $http, Todos){
    $scope.formData = {};
    
    //use service to get all of the todos
    Todos.get()
        .success(function(data){
            $scope.todos = data;
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function(){

        // validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		// people can't just hold enter to keep adding the same to-do anymore
		if (Object.getOwnPropertyNames($scope.formData) !== 0) {

			// call the create function from our service (returns a promise object)
			Todos.create($scope.formData)

				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.todos = data; // assign our new list of todos
				});
		}
    };

    $scope.deleteTodo = function(id){
        Todos.delete(id)
            .success(function(data) {
                // update todo list
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});