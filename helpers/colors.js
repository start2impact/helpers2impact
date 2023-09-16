const colors = {
    createGradient(context, colorStart = "#007369", colorEnd = "#08F7A1") {
        const { ctx } = context.chart;
        const gradientStroke = ctx.createLinearGradient(0, 0, 0, 100);
        gradientStroke.addColorStop(0, colorStart);
        gradientStroke.addColorStop(1, colorEnd);
        return gradientStroke;
    },

    progressColors: {
        activeBackgroundColor: ctx => createGradient(ctx), // '#08F7A1';
        inactiveBackgroundColor: "#EDF1F4", // Light gray,
        blockedBackgroundColor: "#FF5A5F", // Red,
        waitingBackgroundColor: "#FFCB00", // Yellow,
        resendBackgroundColor: "#F2994A", // Orange,
    },

    getProjectStatusColor(
        context,
        projects_completed = 0,
        project_sentnotcorrected = null,
        project_resend = false,
        project_blocked_until = null,
        project_retries = 0,
        projects_count = 0,
    ) {
        const projectsColor = [];

        [...Array(projects_count)].map((project, index) => {
            if (projects_completed >= index + 1) {
                return projectsColor.push(progressColors.activeBackgroundColor(context));
            }

            // if the index is greater than zero, and completed projects are less than the current index
            if (index > 0 && projects_completed < index) {
                return projectsColor.push(progressColors.inactiveBackgroundColor);
            }

            // if project is sended but still not corrected
            if (project_sentnotcorrected !== null) {
                return projectsColor.push(progressColors.waitingBackgroundColor);
            }

            // if project must be resended
            if (project_resend === true) {
                return projectsColor.push(progressColors.resendBackgroundColor);
            }

            // if project is blocked
            if (project_blocked_until !== null || project_retries > 0) {
                return projectsColor.push(progressColors.blockedBackgroundColor);
            }


            return projectsColor.push(progressColors.inactiveBackgroundColor);
        });

        return projectsColor;
    },

}

export default colors;