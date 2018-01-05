let app = require('ui/modules')
.get('app/wazuh', [])
.controller('clusterController', function ($scope, clusterMonitoring, Notifier) {
    const notifier = new Notifier();

    $scope.clusterTab = 'node-info';
    $scope.dataShown  = null;
    $scope.loading    = true;
    $scope.error      = null;

    $scope.switchClusterTab = tab => {
        $scope.dataShown  = 'Loading...';
        $scope.clusterTab = tab;
        switch($scope.clusterTab){
            case 'node-info':
                loadNodeInfo();
                break;
            case 'agents-info':
                loadAgentsInfo();
                break;
            case 'files-info':
                loadFilesInfo();
                break;
            case 'nodes-info':
                loadNodesInfo();
                break;
            case 'status-info':
                loadStatusInfo();
                break;
            case 'config-info':
                loadConfigInfo();
                break;
            default:
                loadNodeInfo();
                break;
        };
    }

    const handleError = error => {
        notifier.error(error);
        $scope.loading = false;
        $scope.error   = error;
    }

    const handleData = data => {
        $scope.dataShown = data.data.data;
        $scope.loading   = false;
        $scope.error     = null;
        $scope.$digest();
    }

    const loadNodeInfo = async () => {
        try {
            $scope.loading = true;
            const data = await clusterMonitoring.getNodeInfo();
            if(data.data.error) {
                return handleError(data.data.error);
            }
            return handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    const loadAgentsInfo = async () => {
        try {
            $scope.loading = true;
            const data = await clusterMonitoring.getAgents();
            if(data.data.error) {
                return handleError(data.data.error);
            }
            return handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    const loadFilesInfo = async () => {
        try {
            $scope.loading = true;
            const data = await clusterMonitoring.getFiles();
            if(data.data.error) {
                return handleError(data.data.error);
            }
            return handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    const loadNodesInfo = async () => {
        try {
            $scope.loading = true;
            const data = await clusterMonitoring.getNodes();
            if(data.data.error) {
                return handleError(data.data.error);
            }
            return handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    const loadStatusInfo = async () => {
        try {
            $scope.loading = true;
            const data = await clusterMonitoring.getStatus();
            if(data.data.error) {
                return handleError(data.data.error);
            }
            return handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    const loadConfigInfo = async () => {
        try {
            $scope.loading = true;
            const data = await clusterMonitoring.getConfig();
            if(data.data.error) {
                return handleError(data.data.error);
            }
            return handleData(data);
        } catch (error) {
            handleError(error);
        }
    }

    loadNodeInfo();

});